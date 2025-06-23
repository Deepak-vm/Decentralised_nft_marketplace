#!/bin/bash

# Build the React client
echo "Building React client..."
cd client
npm run build

# Back to root
cd ..

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

echo "Deployment process completed!"
