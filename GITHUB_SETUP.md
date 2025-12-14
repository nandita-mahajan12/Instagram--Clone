# How to Upload Project to GitHub

## Step-by-Step Guide

### Prerequisites
- ✅ GitHub account ([Sign up here](https://github.com/signup) if you don't have one)
- ✅ Git installed on your computer ([Download here](https://git-scm.com/downloads))

---

## Step 1: Create a New Repository on GitHub

1. **Go to GitHub:** https://github.com
2. **Sign in** to your account
3. **Click the "+" icon** in the top right corner
4. **Select "New repository"**

5. **Fill in the repository details:**
   - **Repository name:** `instagram-clone` (or any name you prefer)
   - **Description:** `Full-stack Instagram clone with Node.js, Express, MongoDB, and Next.js`
   - **Visibility:** Choose **Public** or **Private**
   - **⚠️ DO NOT** check "Initialize this repository with a README" (we already have files)
   - **⚠️ DO NOT** add .gitignore or license (we already have them)

6. **Click "Create repository"**

7. **Copy the repository URL** (you'll need it later)
   - It will look like: `https://github.com/yourusername/instagram-clone.git`

---

## Step 2: Initialize Git in Your Project

1. **Open Terminal/PowerShell** in your project folder

2. **Navigate to project root:**
```bash
cd C:\Users\nandi\instagram-clone
```

3. **Initialize Git repository:**
```bash
git init
```

4. **Check Git status:**
```bash
git status
```

---

## Step 3: Configure Git (First Time Only)

If this is your first time using Git, set your name and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## Step 4: Add Files to Git

1. **Add all files:**
```bash
git add .
```

2. **Check what will be committed:**
```bash
git status
```

You should see all your files listed (except those in .gitignore)

---

## Step 5: Create Initial Commit

```bash
git commit -m "Initial commit: Instagram clone project"
```

---

## Step 6: Connect to GitHub Repository

1. **Add the remote repository:**
```bash
git remote add origin https://github.com/yourusername/instagram-clone.git
```

⚠️ **Replace `yourusername` with your actual GitHub username!**

2. **Verify the remote was added:**
```bash
git remote -v
```

---

## Step 7: Push to GitHub

1. **Push your code:**
```bash
git push -u origin main
```

If you get an error about "main" branch, try:
```bash
git push -u origin master
```

2. **Enter your GitHub credentials** when prompted:
   - Username: Your GitHub username
   - Password: Your GitHub Personal Access Token (not your account password)
   
   **How to create Personal Access Token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token"
   - Give it a name (e.g., "Instagram Clone")
   - Select scopes: `repo` (full control)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

---

## Step 8: Verify on GitHub

1. **Go to your repository on GitHub**
2. **Refresh the page**
3. **You should see all your files and folders!** ✅

---

## Common Commands Reference

### Daily Workflow

**Check status:**
```bash
git status
```

**Add changes:**
```bash
git add .
# or add specific file:
git add filename.js
```

**Commit changes:**
```bash
git commit -m "Description of changes"
```

**Push to GitHub:**
```bash
git push
```

**Pull latest changes:**
```bash
git pull
```

---

## Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/instagram-clone.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: "authentication failed"
- Make sure you're using a Personal Access Token, not your password
- Generate a new token if needed

### Want to update .gitignore?
1. Edit `.gitignore` file
2. Run: `git add .gitignore`
3. Run: `git commit -m "Update .gitignore"`
4. Run: `git push`

---

## What Gets Uploaded?

✅ **Will be uploaded:**
- All source code files
- Configuration files (package.json, etc.)
- README.md
- .gitignore
- Postman collection

❌ **Will NOT be uploaded** (thanks to .gitignore):
- `node_modules/` folders
- `.env` files (sensitive data)
- Build files
- Log files
- OS-specific files

---

## Security Notes

⚠️ **Important:**
- Never commit `.env` files (they contain secrets)
- Never commit `node_modules/` (too large)
- The `.gitignore` file is already configured to exclude these

---

## Next Steps After Uploading

1. **Add a description** to your GitHub repository
2. **Add topics/tags** (e.g., `nodejs`, `react`, `mongodb`, `instagram-clone`)
3. **Update README.md** if needed
4. **Share your repository** with others!

---

## Quick Copy-Paste Commands

```bash
# Navigate to project
cd C:\Users\nandi\instagram-clone

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Instagram clone project"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/instagram-clone.git

# Push to GitHub
git push -u origin main
```

---

🎉 **That's it! Your project is now on GitHub!**
