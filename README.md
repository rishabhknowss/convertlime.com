# ConvertLime

Free image tools that run entirely in your browser. Your files are never uploaded.

**Live site:** [convertlime.com](https://convertlime.com)

- **Convert** between JPG, PNG, WebP, AVIF, HEIC, GIF, BMP and more
- **Remove background** from photos (on-device AI, works offline after the first use)
- **Compress** images and **resize to an exact file size** (e.g. 20 KB, 50 KB)
- **Image to PDF**
- Batch processing, ZIP download, paste (Ctrl/Cmd+V) and drag-and-drop everywhere
- Available in 8 languages: English, Español, Português, Français, Deutsch, 日本語, 한국어, 中文

## Why it's private by design

Every conversion happens on your device with Canvas, WebAssembly and WebGPU/ONNX. No image, file name or result is ever sent to a server. The only network requests are for the page itself and, for background removal, a one-time download of the model.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19
- Tailwind CSS v4 and shadcn/ui
- [@imgly/background-removal](https://github.com/imgly/background-removal-js) with onnxruntime-web
- [@jsquash/avif](https://github.com/jamsinclair/jSquash), heic2any, pdf-lib, fflate, gifenc

## Getting started

Requirements: Node.js 22+ and [pnpm](https://pnpm.io) 10.

```bash
git clone https://github.com/rishabhknowss/convertlime.com.git
cd convertlime.com
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables are needed to run it locally. See [`.env.example`](.env.example) for the optional ones.

### Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |
| `pnpm check:posts` | Validate blog posts in `src/content/blog` |

## Project structure

```
src/
  app/[lang]/        Pages for every language (tools, blog, about)
  components/        UI, tool workspaces, remove-bg components
  data/tools.ts      The list of tools, their formats and URLs
  i18n/              Translations for all 8 languages
  lib/convert/       In-browser decoding and encoding
  lib/remove-bg/     Background removal engine
  content/blog/      Blog posts (Markdown)
```

### Adding a language or translation

Translations live in `src/i18n/dictionaries/<locale>.ts` and `src/i18n/remove-bg/<locale>.ts`. Languages are registered in `src/i18n/config.ts`.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## Security

Please report security issues privately. See [SECURITY.md](SECURITY.md).

## License

[GNU AGPL-3.0](LICENSE). If you run a modified version of ConvertLime as a public website, you must publish your source code under the same license.

The ConvertLime name and logo are not covered by the license. Please don't use them for your own deployment or fork.
