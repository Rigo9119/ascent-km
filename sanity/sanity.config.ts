import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'ascent-km',

  projectId: 'rt15qhkd',
  dataset: 'blog-posts',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
