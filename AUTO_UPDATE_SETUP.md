# Auto-Update Setup (one-time)

The app already has auto-update code built in (`electron-main.js`) and the build pipeline knows to push new versions to GitHub Releases. You need to do **one** small bit of one-time setup so that the publishing actually works.

## Step 1 — Create a free GitHub account

If you don't already have one: https://github.com/signup

## Step 2 — Create a public repo named `pancake-bunny-clicker`

1. Go to https://github.com/new
2. Repository name: **`pancake-bunny-clicker`** (must match what's in `package.json`)
3. Visibility: **Public** (required so user PCs can download updates without auth)
4. Don't initialize with anything — just click "Create repository"

## Step 3 — Update `package.json` with your GitHub username

Open `package.json` and find the `publish` section:
```json
"publish": [
  {
    "provider": "github",
    "owner": "YOUR_GITHUB_USERNAME",
    "repo": "pancake-bunny-clicker"
  }
]
```
Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## Step 4 — Create a Personal Access Token (one-time)

This lets your computer push releases to GitHub on your behalf.

1. Go to https://github.com/settings/tokens/new
2. Note: "Electron publish for Pancake Bunny Clicker"
3. Expiration: pick "No expiration" (or a long one like 1 year)
4. Scopes: check **`public_repo`** (or just `repo` if you made the repo private)
5. Click "Generate token"
6. **Copy the token** (it starts with `ghp_...`). You won't see it again after closing the page.

## Step 5 — Save the token as an environment variable

In PowerShell, run (paste your actual token in place of `ghp_xxxxx`):
```powershell
[Environment]::SetEnvironmentVariable("GH_TOKEN", "ghp_xxxxx", "User")
```
Close and reopen your terminal so the new variable takes effect.

## Step 6 — Publish your first release

From the Clicker folder:
```powershell
npm run publish
```

This builds the `.exe` and uploads it to a new release on GitHub. Takes ~1 minute. Your repo now has a "Releases" tab with v1.0.0.

## How auto-update actually works for users

Every time someone launches the app:
1. The app silently asks GitHub: "any version newer than mine?"
2. If yes, it downloads the new installer in the background
3. When ready, it pops up a dialog: "Update ready — Restart now? / Later"
4. They click Restart and the new version is installed seamlessly

Also re-checks every 30 minutes while the app is open.

## Releasing a new version

1. Edit code as normal.
2. Open `package.json`, bump the `"version"` (e.g. `1.0.0` → `1.0.1`). **You MUST bump the version for auto-update to detect it.**
3. Run `npm run publish` from the Clicker folder.
4. Done. Every user with the installed app picks up the update on next launch.

## Common gotchas

- **Forgot to bump version**: Users won't get the update because GitHub still shows the old version number. Always bump.
- **Repo is private**: Auto-update fails silently because GitHub blocks unauthenticated downloads. Make the repo public, OR use a different host like S3.
- **No internet on the user's PC**: Update check silently fails (caught by the `error` handler in `electron-main.js`); the user keeps using the version they have.
- **Windows SmartScreen warning**: Until you code-sign the `.exe` (~$200/year for a cert), Windows shows "Unrecognized app" the first time. Users click "More info → Run anyway". After enough downloads, Microsoft auto-trusts it.

## Skipping GitHub

If you want to host updates elsewhere instead:
- **S3**: change `"provider": "github"` to `"provider": "s3"` with bucket + region
- **Generic HTTP**: change to `"provider": "generic"` with `"url"`
- Full list: https://www.electron.build/configuration/publish

The `electron-main.js` update logic stays the same — it works with any provider.
