# CXR

## Installing Command Line Programs

### Homebrew
Homebrew is a package manager for Mac. To install it, follow the instructions on this link: <https://brew.sh/>.

To test your install run the following:
```bash
brew --version
```

### Git
Follow the instructions at this link <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>

To test, use the following command:

```bash
git --version
```

### GitHub
Enter the following

```bash
brew install gh
```

### Node.js
Follow the instructions at this link<https://nodejs.org/en/download>.

To test, use the following:
```bash
node -v
npm -v
```

### Firebase CLI
Enter the following:

```bash
npm install -g firebase-tools
```

## Setup

### Authenticating with GitHub

Run the following command to login to the GitHub CLI.

```bash
gh auth login
```

And follow the prompts to login with your github account.

### Cloning the Project

Run the following command from the parent directory you want to store your project in.
```bash
git clone https://github.com/drustanyjt/CharlieX.git
```
To enter the directory use the `cd` command like so:

```bash
cd CharlieX
```

And to install the required packages run the following:

```bash
npm install
```

### Firebase Login

Login to your firebase (google) account using the following command:

```bash
firebase login
```

### Preview

To view the website locally, run the following:

```bash
npm run dev 
```

You can make changes in your code while the local server is running, and they will be instantly reflected in the website.
(This is known as Hot Reloading (or Hot Module Reloading, HMR)).

## Deploy Live

To let others view your website, you need to deploy it. Use the following firebase command to do so:

```bash
firebase deploy --only:hosting
```

## Some Git Tips

The usual flow for making changes is to **pull** updates from GitHub onto your local code.
Then after you make changes you **add** them to be staged follwoed by **commit** to actually save your changes.
The last step is to **push** your code back onto the GitHub repository.

```bash
git pull
# Now make some changes to src
git add . # . is to add all changes, you can specify specific changes too
git commit -m "Added a new feature" # Provide a comment for your commit
git push # Put your code back in our GitHub
```

Here are some docs to help you.

**pull**: <https://www.atlassian.com/git/tutorials/syncing/git-pull> 
**add**: <https://www.atlassian.com/git/tutorials/saving-changes> 
**commit**: <https://www.atlassian.com/git/tutorials/saving-changes/git-commit> 
**push**: <https://www.atlassian.com/git/tutorials/syncing/git-push> 