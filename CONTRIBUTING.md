# Contributing Guidelines

Thank you for considering contributing to `craft`! To maintain code quality and stability, we enforce strict branching and code review policies.

---

## 🔒 Branch & Merge Policy

- **No Direct Pushes to `main`**: The `main` branch is protected. Direct pushes to `main` are strictly forbidden for all contributors.
- **Pull Requests Only**: All changes, features, and bug fixes must be submitted via Pull Requests (PRs) from feature or bugfix branches.
- **Owner Review & Approval**: Only repository owners/maintainers are authorized to review, approve, and merge Pull Requests into `main`.

---

## 🛠️ How to Contribute

1. **Fork or Clone the Repository**

   ```bash
   git clone https://github.com/sudheerdotai/craft.git
   cd craft
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Create a Feature or Bugfix Branch**
   Name your branch descriptively (e.g., `feat/add-user-auth` or `fix/nav-bar-responsive`):

   ```bash
   git checkout -b feat/your-feature-name
   ```

4. **Make Your Changes & Test Locally**
   Ensure code meets quality standards and passes all build checks:

   ```bash
   pnpm lint
   pnpm build
   ```

5. **Commit Your Changes**
   Write clear, concise commit messages following conventional format:

   ```bash
   git commit -m "feat: add user authentication component"
   ```

6. **Push Branch & Open a Pull Request**
   Push your branch to GitHub and open a Pull Request targeting the `main` branch:

   ```bash
   git push origin feat/your-feature-name
   ```

7. **Code Review & Merging**
   - Fill out the Pull Request template completely.
   - A repository owner will review your PR. Address any requested changes promptly.
   - Once approved by an owner, the PR will be merged into `main`.

---

## ⚙️ Recommended GitHub Branch Protection Rules (For Repository Owners)

To enforce this workflow on GitHub:

1. Go to **Settings** > **Branches** in the GitHub repository.
2. Click **Add branch protection rule** (or edit existing rule for `main`).
3. Set **Branch pattern name**: `main`.
4. Enable the following settings:
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals (1 approval)
     - ✅ **Require review from Code Owners** (ensures only repository owners listed in `CODEOWNERS` can approve)
   - ❌ **Do NOT enable "Require status checks to pass"**
   - ✅ **Do not allow bypassing the above settings** (Enforce rules for administrators/everyone)
   - ✅ **Restrict who can push to matching branches** (Prevent direct pushes)

---

## 📝 Code & Design Guidelines

- Follow existing Next.js (App Router), React, and TypeScript patterns.
- Keep components modular and readable.
- Maintain tailwind CSS standards used across the project.
