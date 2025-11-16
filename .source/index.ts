// @ts-nocheck -- skip type checking
import * as d_docs_2 from "../lib/docs/components/status-indicator.mdx?collection=docs";
import * as d_docs_1 from "../lib/docs/(root)/setup.mdx?collection=docs";
import * as d_docs_0 from "../lib/docs/(root)/index.mdx?collection=docs";
import { _runtime } from "fumadocs-mdx/runtime/next";
import * as _source from "../source.config";
export const docs = _runtime.docs<typeof _source.docs>(
  [
    {
      info: { path: "(root)/index.mdx", fullPath: "lib/docs/(root)/index.mdx" },
      data: d_docs_0
    },
    {
      info: { path: "(root)/setup.mdx", fullPath: "lib/docs/(root)/setup.mdx" },
      data: d_docs_1
    },
    {
      info: {
        path: "components/status-indicator.mdx",
        fullPath: "lib/docs/components/status-indicator.mdx"
      },
      data: d_docs_2
    }
  ],
  [
    {
      info: { path: "meta.json", fullPath: "lib/docs/meta.json" },
      data: { pages: ["(root)", "components"], root: true }
    },
    {
      info: { path: "(root)/meta.json", fullPath: "lib/docs/(root)/meta.json" },
      data: {
        title: "Getting Started",
        pages: ["index", "setup", "usage", "troubleshooting"]
      }
    }
  ]
);
