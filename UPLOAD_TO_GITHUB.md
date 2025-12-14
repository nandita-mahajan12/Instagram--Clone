# Step-by-Step: Upload Project to GitHub

## 📋 Prerequisites
- ✅ GitHub account (create at https://github.com/signup)
- ✅ Git installed (download at https://git-scm.com/downloads)

---

## STEP 1: Create GitHub Repository

1. **Go to:** https://github.com
2. **Sign in** to your account
3. **Click the green "New" button** (or the "+" icon → "New repository")
4. **Fill in:**
   - **Repository name:** `instagram-clone`
   - **Description:** `Instagram clone - Full stack app`
   - **Visibility:** Choose **Public** or **Private**
   - ⚠️ **UNCHECK** "Add a README file"
   - ⚠️ **UNCHECK** "Add .gitignore"
   - ⚠️ **UNCHECK** "Choose a license"
5. **Click "Create repository"**
6. **Copy the repository URL** shown (looks like: `https://github.com/yourusername/instagram-clone.git`)

---

## STEP 2: Open Terminal in Project Folder

1. **Open PowerShell or Command Prompt**
2. **Navigate to your project:**
```bash
cd C:\Users\nandi\instagram-clone
```

---

## STEP 3: Initialize Git

**Type this command:**
```bash
git init
```

**Expected output:** `Initialized empty Git repository...`

---

## STEP 4: Configure Git (First Time Only)

**If this is your first time using Git, run these:**

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email.

---

## STEP 5: Add All Files

**Type this command:**
```bash
git add .
```

**Check what was added:**
```bash
git status
```

You should see all your files listed in green.

---

## STEP 6: Create First Commit

**Type this command:**
```bash
git commit -m "Initial commit: Instagram clone project"
```

**Expected output:** `[main (or master) xxxxxxx] Initial commit...`

---

## STEP 7: Connect to GitHub

**Type this command (replace YOUR_USERNAME with your GitHub username):**
```bash
git remote add origin https://github.com/YOUR_USERNAME/instagram-clone.git
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/instagram-clone.git
```

**Verify it worked:**
```bash
git remote -v
```

Should show your repository URL.

---

## STEP 8: Create Personal Access Token

**You need this to push to GitHub:**

1. **Go to:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Fill in:**
   - **Note:** `Instagram Clone Project`
   - **Expiration:** Choose duration (90 days recommended)
   - **Select scopes:** Check ✅ `repo` (this selects all repo permissions)
4. **Click:** "Generate token" at the bottom
5. **⚠️ COPY THE TOKEN IMMEDIATELY** (you won't see it again!)
   - It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## STEP 9: Push to GitHub

**Type this command:**
```bash
git push -u origin main
```

**If you get error about "main", try:**
```bash
git push -u origin master
```

**When prompted:**
- **Username:** Enter your GitHub username
- **Password:** Paste the Personal Access Token (NOT your GitHub password!)

**Expected output:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), done.
To https://github.com/yourusername/instagram-clone.git
 * [new branch]      main -> main
```

---

## STEP 10: Verify on GitHub

1. **Go to your repository:** https://github.com/yourusername/instagram-clone
2. **Refresh the page**
3. **You should see all your files and folders!** ✅

---

## ✅ Success Checklist

- [ ] GitHub repository created
- [ ] Git initialized in project folder
- [ ] All files added (`git add .`)
- [ ] First commit created
- [ ] Remote repository connected
- [ ] Personal Access Token created
- [ ] Code pushed to GitHub
- [ ] Files visible on GitHub website

---

## 🔧 Troubleshooting

### Error: "remote origin already exists"
**Solution:**
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/instagram-clone.git
```

### Error: "failed to push some refs"
**Solution:**
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Error: "authentication failed"
**Solution:**
- Make sure you're using Personal Access Token, not password
- Generate a new token if needed
- Make sure token has `repo` scope checked

### Error: "main" vs "master"
**If main doesn't work:**
```bash
git branch -M main
git push -u origin main
```

**Or use master:**
```bash
git push -u origin master
```

---

## 📝 Quick Reference - All Commands

```bash
# 1. Navigate to project
cd C:\Users\nandi\instagram-clone

# 2. Initialize Git
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit: Instagram clone project"

# 5. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/instagram-clone.git

# 6. Push to GitHub
git push -u origin main
```

---

## 🎉 Done!

Your project is now on GitHub! You can:
- Share the repository link
- Clone it on other computers
- Collaborate with others
- Track changes over time

---

## 📌 Future Updates

**To update your GitHub repository after making changes:**

```bash
git add .
git commit -m "Description of your changes"
git push
```

That's it! 🚀
