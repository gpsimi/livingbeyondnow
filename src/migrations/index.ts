import * as migration_20260206_111706_initial from './20260206_111706_initial';
import * as migration_20260209_144800_rename_posts_to_blog from './20260209_144800_rename_posts_to_blog';
import * as migration_20260709_111605_add_pages_and_format_to_products from './20260709_111605_add_pages_and_format_to_products';
import * as migration_20260709_194153_add_downloads_collection_and_filekey_to_products from './20260709_194153_add_downloads_collection_and_filekey_to_products';
import * as migration_20260709_205726_add_book_files_collection_and_relationship from './20260709_205726_add_book_files_collection_and_relationship';

export const migrations = [
  {
    up: migration_20260206_111706_initial.up,
    down: migration_20260206_111706_initial.down,
    name: '20260206_111706_initial',
  },
  {
    up: migration_20260209_144800_rename_posts_to_blog.up,
    down: migration_20260209_144800_rename_posts_to_blog.down,
    name: '20260209_144800_rename_posts_to_blog',
  },
  {
    up: migration_20260709_111605_add_pages_and_format_to_products.up,
    down: migration_20260709_111605_add_pages_and_format_to_products.down,
    name: '20260709_111605_add_pages_and_format_to_products',
  },
  {
    up: migration_20260709_194153_add_downloads_collection_and_filekey_to_products.up,
    down: migration_20260709_194153_add_downloads_collection_and_filekey_to_products.down,
    name: '20260709_194153_add_downloads_collection_and_filekey_to_products',
  },
  {
    up: migration_20260709_205726_add_book_files_collection_and_relationship.up,
    down: migration_20260709_205726_add_book_files_collection_and_relationship.down,
    name: '20260709_205726_add_book_files_collection_and_relationship'
  },
];
