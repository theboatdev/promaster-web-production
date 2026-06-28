import { type SchemaTypeDefinition } from 'sanity'
import { productCategory } from './productCategory'
import { product } from './product'
import { certification } from './certification'
import { resource } from './resource'
import { project } from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productCategory, product, certification, resource, project],
}
