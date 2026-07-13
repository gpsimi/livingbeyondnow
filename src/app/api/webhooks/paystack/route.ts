import { NextResponse } from "next/server"
import crypto from "crypto"

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get("x-paystack-signature")

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 })
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY || ''
    
    // Paystack signature verification: HMAC SHA512 of the raw body using secret key
    const hash = crypto
      .createHmac("sha512", paystackSecret)
      .update(body)
      .digest("hex")

    if (hash !== signature) {
      console.error("Paystack webhook signature verification failed.")
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const event = JSON.parse(body)

    if (event.event === "charge.success") {
      const data = event.data;
      const metadata = data.metadata;
      const email = data.customer?.email;

      console.log(`Payment confirmed via Paystack for email: ${email}`, metadata);

      if (email && metadata && Array.isArray(metadata.items)) {
        const { getPayload } = await import('payload');
        const configPromise = (await import('@payload-config')).default;
        const payload = await getPayload({ config: configPromise });

        const downloadLinksHtml: string[] = [];
        const itemsListHtml: string[] = [];
        
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.livingbeyondnow.org';
        const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const logoUrl = `${cleanBaseUrl}/logo.png`;

        for (const item of metadata.items) {
          try {
            const product = await payload.findByID({
              collection: 'products',
              id: item.id,
              depth: 0,
            });

            if (product) {
              const token = crypto.randomUUID();
              const expiresAt = new Date();
              expiresAt.setHours(expiresAt.getHours() + 24); // link expires in 24 hours

              await payload.create({
                collection: 'downloads',
                data: {
                  token,
                  product: product.id,
                  email,
                  downloadCount: 0,
                  maxDownloads: 2, // Allow 2 downloads per link
                  expiresAt: expiresAt.toISOString(),
                },
              });

              const downloadUrl = `${cleanBaseUrl}/api/download?token=${token}`;

              downloadLinksHtml.push(`
                <li style="margin-bottom: 20px; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #f9fafb;">
                  <span style="font-size: 15px; font-weight: bold; color: #111827; display: block; margin-bottom: 8px;">${product.title}</span>
                  <a href="${downloadUrl}" style="display: inline-block; background: #8B2C2C; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Download PDF Book</a>
                  <span style="display: block; font-size: 11px; color: #6b7280; margin-top: 8px;">This secure link is active for 24 hours and can be used to download the file up to 2 times.</span>
                </li>
              `);

              itemsListHtml.push(`
                <tr>
                  <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: left; vertical-align: middle;">
                    <span style="font-size: 14px; font-weight: bold; color: #111827; display: block;">${product.title}</span>
                    <span style="font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">${product.format || 'Digital Book'}</span>
                  </td>
                  <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #4b5563; font-size: 14px; vertical-align: middle;">
                    ${item.quantity}
                  </td>
                  <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827; font-size: 14px; font-weight: bold; vertical-align: middle;">
                    $${(product.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              `);
            }
          } catch (itemErr) {
            console.error(`Failed to process download token for product ID ${item.id}:`);
            console.dir(itemErr, { depth: null });
          }
        }

        if (downloadLinksHtml.length > 0) {
          const totalNgnPaid = data.amount / 100;
          const usdAmount = Number(metadata.usdAmount || (totalNgnPaid / (metadata.conversionRate || 1600)));

          // 1. Customer Email HTML
          const customerEmailHtml = `
            <div style="background-color: #f3f4f6; padding: 32px 16px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
                <!-- Header with logo and green bar -->
                <div style="background-color: #1B3629; padding: 24px; text-align: center;">
                  <img src="${logoUrl}" alt="Living Beyond Now" style="height: 64px; width: auto; display: block; margin: 0 auto 12px;" />
                  <span style="color: #ffffff; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; display: block;">Living Beyond Now</span>
                </div>
                
                <div style="padding: 32px 24px;">
                  <h2 style="color: #111827; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Order Confirmation</h2>
                  <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin-top: 0; margin-bottom: 24px;">
                    Thank you for your purchase! Below is a summary of your order and secure links to download your purchased digital books.
                  </p>
                  
                  <!-- Order details table -->
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                    <thead>
                      <tr style="background-color: #f9fafb;">
                        <th style="padding: 8px; border-bottom: 2px solid #e5e7eb; text-align: left; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Item</th>
                        <th style="padding: 8px; border-bottom: 2px solid #e5e7eb; text-align: center; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Qty</th>
                        <th style="padding: 8px; border-bottom: 2px solid #e5e7eb; text-align: right; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsListHtml.join('')}
                    </tbody>
                  </table>
                  
                  <!-- Totals box -->
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <tr>
                      <td style="padding: 16px; border-radius: 8px;">
                        <table style="width: 100%;">
                          <tr>
                            <td style="font-size: 13px; color: #4b5563; padding-bottom: 8px;">Subtotal (USD)</td>
                            <td style="font-size: 13px; font-weight: 600; color: #111827; text-align: right; padding-bottom: 8px;">$${usdAmount.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td style="font-size: 13px; color: #4b5563; padding-bottom: 8px;">Payment Method</td>
                            <td style="font-size: 13px; font-weight: 600; color: #111827; text-align: right; padding-bottom: 8px;">Card (via Paystack)</td>
                          </tr>
                          <tr>
                            <td style="font-size: 15px; font-weight: bold; color: #111827; border-top: 1px solid #e5e7eb; padding-top: 8px;">Total Paid (NGN)</td>
                            <td style="font-size: 15px; font-weight: bold; color: #1B3629; text-align: right; border-top: 1px solid #e5e7eb; padding-top: 8px;">₦${totalNgnPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Download Links Section -->
                  <h3 style="color: #111827; font-size: 14px; font-weight: 700; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Your Secure Download Links</h3>
                  <ul style="list-style: none; padding-left: 0; margin: 0 0 32px 0;">
                    ${downloadLinksHtml.join('')}
                  </ul>
                  
                  <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 32px 0;" />
                  
                  <!-- Support footer -->
                  <div style="text-align: center; color: #6b7280; font-size: 12px; line-height: 1.5;">
                    <p style="margin: 0 0 8px;">Order Reference: <strong>${data.reference}</strong></p>
                    <p style="margin: 0;">If you have any questions or issues, please reply to this email or contact us at <a href="mailto:info@livingbeyondnow.org" style="color: #8B2C2C; text-decoration: none; font-weight: 600;">info@livingbeyondnow.org</a>.</p>
                  </div>
                </div>
              </div>
            </div>
          `;

          // Send receipt + downloads to Customer
          await payload.sendEmail({
            to: email,
            from: `Living Beyond Now <${process.env.SENDER_EMAIL || 'info@livingbeyondnow.org'}>`,
            subject: 'Your Book Download Links - Living Beyond Now',
            html: customerEmailHtml,
          });

          console.log(`Fulfillment email sent to ${email} for ${downloadLinksHtml.length} book(s)`);

          // 2. Admin Email HTML
          const adminNotificationHtml = `
            <div style="background-color: #f3f4f6; padding: 32px 16px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
                <!-- Header with logo and dark red bar for admin alert -->
                <div style="background-color: #8B2C2C; padding: 24px; text-align: center;">
                  <img src="${logoUrl}" alt="Living Beyond Now" style="height: 64px; width: auto; display: block; margin: 0 auto 12px;" />
                  <span style="color: #ffffff; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; display: block;">Living Beyond Now</span>
                </div>
                
                <div style="padding: 32px 24px;">
                  <h2 style="color: #111827; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 8px;">New Order Notification</h2>
                  <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin-top: 0; margin-bottom: 24px;">
                    A customer has successfully purchased books on the website. Here are the transaction and order details.
                  </p>
                  
                  <!-- Customer Information -->
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <tr>
                      <td style="padding: 16px;">
                        <table style="width: 100%;">
                          <tr>
                            <td style="font-size: 13px; font-weight: bold; color: #4b5563; padding-bottom: 8px; width: 120px;">Customer Email:</td>
                            <td style="font-size: 13px; color: #111827; padding-bottom: 8px;">${email}</td>
                          </tr>
                          <tr>
                            <td style="font-size: 13px; font-weight: bold; color: #4b5563; padding-bottom: 8px;">Paystack Ref:</td>
                            <td style="font-size: 13px; color: #111827; padding-bottom: 8px; font-family: monospace;">${data.reference}</td>
                          </tr>
                          <tr>
                            <td style="font-size: 13px; font-weight: bold; color: #4b5563;">Date & Time:</td>
                            <td style="font-size: 13px; color: #111827;">${new Date().toLocaleString()}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Order details table -->
                  <h3 style="color: #111827; font-size: 14px; font-weight: 700; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Purchased Items</h3>
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                    <thead>
                      <tr style="background-color: #f9fafb;">
                        <th style="padding: 8px; border-bottom: 2px solid #e5e7eb; text-align: left; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Item</th>
                        <th style="padding: 8px; border-bottom: 2px solid #e5e7eb; text-align: center; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Qty</th>
                        <th style="padding: 8px; border-bottom: 2px solid #e5e7eb; text-align: right; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #6b7280;">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsListHtml.join('')}
                    </tbody>
                  </table>
                  
                  <!-- Totals box -->
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <tr>
                      <td style="padding: 16px; border-radius: 8px;">
                        <table style="width: 100%;">
                          <tr>
                            <td style="font-size: 13px; color: #4b5563; padding-bottom: 8px;">Order Value (USD)</td>
                            <td style="font-size: 13px; font-weight: 600; color: #111827; text-align: right; padding-bottom: 8px;">$${usdAmount.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td style="font-size: 15px; font-weight: bold; color: #111827; border-top: 1px solid #e5e7eb; padding-top: 8px;">Total Received (NGN)</td>
                            <td style="font-size: 15px; font-weight: bold; color: #8B2C2C; text-align: right; border-top: 1px solid #e5e7eb; padding-top: 8px;">₦${totalNgnPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          `;

          // Send admin notifications
          const adminEmails = process.env.ADMIN_NOTIFICATION_EMAIL
            ? process.env.ADMIN_NOTIFICATION_EMAIL.replace(/"/g, '').split(',')
            : ['info@livingbeyondnow.org'];

          for (const adminEmail of adminEmails) {
            try {
              await payload.sendEmail({
                to: adminEmail.trim(),
                from: `Living Beyond Now <${process.env.SENDER_EMAIL || 'info@livingbeyondnow.org'}>`,
                subject: 'New Purchase Notification - Living Beyond Now',
                html: adminNotificationHtml,
              });
              console.log(`Admin notification sent to ${adminEmail.trim()}`);
            } catch (adminErr) {
              console.error(`Failed to send notification to admin ${adminEmail}:`, adminErr);
            }
          }
        }
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Paystack Webhook Error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
