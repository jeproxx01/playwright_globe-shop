# Globe Online Shop - Playwright Automation Framework

Enterprise-grade Playwright TypeScript automation framework for Globe Online Shop.

## Architecture

```
├── src/
│   ├── config/
│   │   └── env.ts              # Environment configuration
│   └── pages/
│       └── otp.page.ts         # Page Object Model
├── tests/
│   └── otp.spec.ts             # Test spec
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── .env                        # Environment variables (git-ignored)
├── .env.example                # Environment template
└── package.json
```

## Installation

```bash
npm install
npx playwright install --with-deps
```

## Setup

1. Copy `.env.example` to `.env`
2. Set `BASE_URL` for target environment

```bash
cp .env.example .env
```

## Environment Variables

| Variable    | Default                       | Description                    |
|-------------|-------------------------------|--------------------------------|
| `BASE_URL`  | `https://shop.globe.com.ph`   | Target application URL         |

## Running Tests

```bash
npm test                        # Headless run
npm run test:headed             # Headed (visible browser)
npm run test:ui                 # Playwright UI mode
npm run test:debug              # Debug mode with Inspector
npm run test:report             # View HTML report
```

## CI/CD Integration

GitHub Actions workflow runs on push/PR to `main` and `master`.

### GitHub Secrets

| Secret   | Description                    |
|----------|--------------------------------|
| `BASE_URL` | Target environment URL      |

Set via: `gh secret set BASE_URL -b "https://staging.shop.globe.com.ph"`

## TypeScript Configuration

**Anti-pattern fixed:**
```json
{"module": "CommonJS", "moduleResolution": "bundler"}
```

**Current config:**
```json
{
  "module": "Node16",
  "moduleResolution": "Node16"
}
```

`CommonJS` + `bundler` causes module resolution conflicts with Playwright's ESM-based test runner. `Node16` is the correct pairing for modern TypeScript with `"type": "module"`.

## Page Object Model

- Locators encapsulated as class properties
- Lazy initialization with `.or()` for resilient fallbacks
- No hardcoded URLs — uses `baseURL` from config
- Expect assertions after every action

## Best Practices Applied

- **Auto-waiting**: All actions use Playwright's built-in waiting
- **Semantic locators**: `getByRole`, `getByLabel`, `getByText`
- **No hardcoded waits**: No `waitForTimeout` or `page.waitForLoadState('networkidle')`
- **Assertions**: `toBeVisible`, `toBeEnabled`, `toBeChecked`, `toHaveURL`
- **Environment parity**: Same config works locally and in CI

## Troubleshooting

```bash
# Inspect failing tests
npx playwright test --debug

# View last run report
npm run test:report

# Check TypeScript
npm run typecheck

# Clear Playwright cache
npx playwright install --force
```

## Project Structure Rationale

| Layer         | Purpose                          |
|---------------|----------------------------------|
| `src/pages/`  | Reusable Page Object Models      |
| `tests/`      | Test specs only                  |
| `.env`        | Environment-specific secrets     |
| CI workflow   | Automated execution on PR/push   |
