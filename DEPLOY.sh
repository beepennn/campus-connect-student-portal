#!/bin/bash

# CampusConnect Deployment Script
# This script helps you deploy to production

set -e

echo "🚀 CampusConnect Deployment Script"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✓ Node.js installed${NC}"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed${NC}"
    echo "Please install Git from https://git-scm.com"
    exit 1
fi

echo -e "${GREEN}✓ Git installed${NC}"

# Step 1: Install dependencies
echo ""
echo -e "${YELLOW}Step 1: Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 2: Build for production
echo ""
echo -e "${YELLOW}Step 2: Building for production...${NC}"
npm run build
echo -e "${GREEN}✓ Build completed${NC}"

# Step 3: Test build locally
echo ""
echo -e "${YELLOW}Step 3: Starting production server (test)...${NC}"
echo "The server will run on http://localhost:3000"
echo "Press Ctrl+C to stop"
npm start &
SERVER_PID=$!
sleep 3

# Check if server is running
if kill -0 $SERVER_PID 2>/dev/null; then
    echo -e "${GREEN}✓ Production server running${NC}"
    kill $SERVER_PID 2>/dev/null || true
else
    echo -e "${RED}❌ Server failed to start${NC}"
    exit 1
fi

# Step 4: Push to Git
echo ""
echo -e "${YELLOW}Step 4: Preparing Git...${NC}"
git add .
git commit -m "CampusConnect production ready - $(date +%Y-%m-%d)" || true
echo -e "${GREEN}✓ Changes committed${NC}"

# Step 5: Deploy instructions
echo ""
echo -e "${GREEN}=================================${NC}"
echo -e "${GREEN}✓ Ready for Deployment!${NC}"
echo -e "${GREEN}=================================${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. Push to GitHub:"
echo "   git push origin main"
echo ""
echo "2. Vercel will automatically deploy (if connected)"
echo "   Or go to https://vercel.com and import your repo"
echo ""
echo "3. Your app will be live on a URL like:"
echo "   https://campusconnect-xyz.vercel.app"
echo ""
echo "4. Share the URL with your teacher!"
echo ""
echo -e "${YELLOW}Before deployment, make sure:${NC}"
echo "  ✓ Environment variables are set in Vercel"
echo "  ✓ Database is set up"
echo "  ✓ Storage bucket exists"
echo ""
echo "See README_PRODUCTION.md for full deployment guide"
echo ""
