# Contributing to ConvertLime

Thanks for helping out. Bug reports, translations and new tools are all welcome.

## Before you start

- For anything bigger than a small fix, open an issue first so we can agree on the approach.
- Keep everything client-side. A change that sends user files to a server will not be merged.

## Development

```bash
pnpm install
pnpm dev
```

Before opening a pull request, run:

```bash
pnpm lint
pnpm build
```

## Pull requests

- Keep each PR focused on one change.
- Match the existing code style and patterns.
- Include screenshots for UI changes.
- Test on a phone (or mobile emulation) for anything that touches file handling.
- When you add user-facing text, add it for all 8 languages. If you can't translate it, say so in the PR.

## Reporting bugs

Open an issue with:

- What you did, what you expected, and what happened
- Browser, device and OS
- The file type and rough size (please don't attach private photos)

By contributing, you agree that your contributions are licensed under the [AGPL-3.0](LICENSE).
