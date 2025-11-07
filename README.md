# Bridalflock Frontend

A Next.js application for Bridalflock with automated Firebase Hosting deployment via GitHub Actions.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Hosting enabled
- Firebase service account JSON file

## Getting Started

For development instructions, see the [app/README.md](./app/README.md) file.

## CI/CD Setup

This repository uses GitHub Actions to automatically deploy to Firebase Hosting. The workflow is defined in `.github/workflows/deploy_firebase_hosting.yml`.

### Setting Up GitHub Secrets for Firebase Deployment

The GitHub Action requires a Firebase service account key to authenticate with Firebase. Here's how to set it up:

#### Step 1: Get Your Firebase Service Account JSON

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on the gear icon (⚙️) next to "Project Overview" and select "Project settings"
4. Go to the "Service accounts" tab
5. Click "Generate new private key"
6. Click "Generate key" - this will download a JSON file

The downloaded JSON file will look like this:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

#### Step 2: Add the JSON as a GitHub Secret

**Important:** GitHub secrets accept the entire JSON file content as-is. You need to paste the complete JSON content, including all line breaks and formatting.

1. Go to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. For the secret name, use: `FIREBASE_SERVICE_ACCOUNT_BRIDALFLOCK_DEV`
6. For the value:
   - Open your Firebase service account JSON file
   - **Copy the ENTIRE content** of the file (all the JSON including curly braces)
   - Paste it directly into the "Secret" field
   - **Do NOT** modify, minify, or encode the JSON
   - **Do NOT** wrap it in quotes or add any additional formatting

7. Click "Add secret"

#### Secret Format Example

The secret value should be the raw JSON content exactly as it appears in the downloaded file:

```json
{
  "type": "service_account",
  "project_id": "bridalflock-dev",
  "private_key_id": "your-private-key-id-here",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@bridalflock-dev.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40bridalflock-dev.iam.gserviceaccount.com"
}
```

### How the Workflow Uses the Secret

The GitHub Action workflow (`.github/workflows/deploy_firebase_hosting.yml`) uses the secret like this:

```yaml
- name: Deploy to Firebase (Development)
  uses: FirebaseExtended/action-hosting-deploy@v0
  with:
    repoToken: ${{ secrets.GITHUB_TOKEN }}
    firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_BRIDALFLOCK_DEV }}
    channelId: live
    projectId: bridalflock-dev
    entryPoint: app
```

The `FirebaseExtended/action-hosting-deploy` action expects the JSON content directly and will parse it internally.

### Troubleshooting

**Issue: "Error: Invalid service account"**
- **Solution:** Make sure you copied the entire JSON content including the opening `{` and closing `}`
- Verify there are no extra characters or spaces before/after the JSON

**Issue: "Error: Private key must be a string"**
- **Solution:** Check that the `private_key` field in your JSON includes the `\n` characters and is properly formatted with the `-----BEGIN PRIVATE KEY-----` header and `-----END PRIVATE KEY-----` footer

**Issue: "Error: Project ID mismatch"**
- **Solution:** Verify that the `project_id` in your JSON matches the `projectId` specified in the workflow file (currently set to `bridalflock-dev`)

**Issue: "Permission denied"**
- **Solution:** In Firebase Console, ensure the service account has the necessary permissions:
  - Go to IAM & Admin in Google Cloud Console
  - Find your service account email
  - Ensure it has "Firebase Hosting Admin" role

### Deployment Behavior

- **Non-main branches:** Deploys to development environment (`bridalflock-dev`)
- **Main branch:** Deploys to production environment (currently also `bridalflock-dev`, update as needed)

## Security Note

⚠️ **Never commit the Firebase service account JSON file to the repository!** Always use GitHub Secrets for sensitive credentials.

Add this to your `.gitignore` if you store the file locally:

```
# Firebase service account keys
*-firebase-adminsdk-*.json
firebase-service-account.json
serviceAccountKey.json
```

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy_firebase_hosting.yml   # GitHub Actions workflow
├── app/                                   # Next.js application
│   ├── src/                              # Source files
│   ├── public/                           # Static assets
│   └── README.md                         # App-specific documentation
└── README.md                             # This file
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test locally
4. Push your branch (this will trigger a deployment to the dev environment)
5. Create a pull request

## License

[Add your license information here]
