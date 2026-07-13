

import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

const getErrorHtml = (message: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Download Failed - Living Beyond Now</title>
  <style>
    body {
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
      color: #f8fafc;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      box-sizing: border-box;
    }
    .card {
      background: rgba(30, 41, 59, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 40px;
      max-width: 500px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      animation: fadeIn 0.6s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    h1 {
      font-size: 26px;
      margin-top: 0;
      color: #f43f5e;
      font-weight: 700;
    }
    p {
      color: #94a3b8;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
      color: white;
      padding: 12px 32px;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
    }
    .logo {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 24px;
      color: #818cf8;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">LIVING BEYOND NOW</div>
    <h1>Download Failed</h1>
    <p>${message}</p>
    <a href="/shop" class="btn">Return to Shop</a>
  </div>
</body>
</html>
`;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return new Response(getErrorHtml('Missing or invalid download token. Please check your link.'), {
        status: 400,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const payload = await getPayload({ config: configPromise });

    // 1. Find the download record associated with the token
    const downloads = await payload.find({
      collection: 'downloads',
      where: { token: { equals: token } },
      limit: 1,
    });

    const downloadDoc = downloads.docs[0];
    if (!downloadDoc) {
      return new Response(getErrorHtml('The download link is invalid or does not exist.'), {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // 2. Resolve the product details
    const product = typeof downloadDoc.product === 'object' 
      ? downloadDoc.product 
      : await payload.findByID({ collection: 'products', id: downloadDoc.product as number });

    if (!product) {
      return new Response(getErrorHtml('The product associated with this download could not be found.'), {
        status: 404,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // 3. Verify download expiration (24h or set duration)
    const isExpired = new Date(downloadDoc.expiresAt) < new Date();
    if (isExpired) {
      return new Response(
        getErrorHtml('This download link has expired. Secure links are only active for 24 hours after purchase.'),
        { status: 410, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // 4. Verify download limit
    if (downloadDoc.downloadCount >= downloadDoc.maxDownloads) {
      return new Response(
        getErrorHtml('This download link has exceeded its maximum usage limit (1-2 downloads allowed per link).'),
        { status: 410, headers: { 'Content-Type': 'text/html' } }
      );
    }

    // 5. Ensure product file is uploaded
    const bookFileRelation = product.bookFile;
    const bookFile = typeof bookFileRelation === 'object'
      ? bookFileRelation
      : (bookFileRelation ? await payload.findByID({ collection: 'book-files', id: bookFileRelation as number }) : null);

    if (!bookFile || !bookFile.filename) {
      return new Response(
        getErrorHtml('The digital file for this book has not been uploaded in the system. Please contact support.'),
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    const filename = bookFile.filename;

    // 6. Update download count in database
    await payload.update({
      collection: 'downloads',
      id: downloadDoc.id,
      data: {
        downloadCount: downloadDoc.downloadCount + 1,
      },
    });

    // 7. Request file from Supabase Private Storage using HTTP REST API and service role key
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration missing in environment variables.');
      return new Response(
        getErrorHtml('Server configuration error. Service role authentication is missing.'),
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    const fileUrl = `${supabaseUrl}/storage/v1/object/authenticated/books/${encodeURIComponent(filename)}`;
    const fileResponse = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${supabaseServiceKey}`,
        apikey: supabaseServiceKey,
      },
    });

    if (!fileResponse.ok) {
      console.error(`Supabase download failed with status ${fileResponse.status} for file ${filename}`);
      return new Response(
        getErrorHtml('Failed to retrieve the book file from secure storage. Please verify the file exists.'),
        { status: 500, headers: { 'Content-Type': 'text/html' } }
      );
    }

    const arrayBuffer = await fileResponse.arrayBuffer();
    
    // Use the product's title with spaces and casing for a beautiful downloaded filename.
    // We strip double quotes and newlines to avoid breaking the HTTP header format.
    const cleanHeaderFilename = product.title
      ? product.title.replace(/["\r\n]/g, '').trim() + '.pdf'
      : 'book_download.pdf';

    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${cleanHeaderFilename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });

  } catch (error) {
    console.error('Secure Download Route Error:', error);
    return new Response(
      getErrorHtml('An unexpected error occurred during file delivery. Please try again or contact support.'),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
