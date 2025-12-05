# GitHub Actions Workflows

## 🔄 CI Pipeline cho Vue Repository

### **CI Workflow** (`ci.yml`)
Chạy tự động khi:
- Push vào `main` hoặc `develop`
- Tạo Pull Request vào bất kỳ branch nào

**Stages:**
- ✅ Lint code với ESLint
- ✅ Type check với TypeScript
- ✅ Build production
- ✅ Upload build artifacts

## ⚙️ GitHub Secrets (Optional)

Nếu muốn auto-deploy:

### Netlify:
```
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
```

### Vercel:
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

### Custom VPS:
```
SSH_HOST
SSH_USER
SSH_KEY
```

## 📝 Deploy Options

### Option 1: Netlify (Recommended cho Vue SPA)

Uncomment deploy job trong `ci.yml`:
```yaml
deploy:
  runs-on: ubuntu-latest
  needs: build
  if: github.ref == 'refs/heads/main'
  steps:
    - name: Download artifacts
      uses: actions/download-artifact@v3
      with:
        name: dist
    
    - name: Deploy to Netlify
      uses: netlify/actions/cli@master
      with:
        args: deploy --dir=dist --prod
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### Option 2: Vercel

```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@v20
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
    working-directory: ./
```

### Option 3: Custom VPS (Nginx)

```yaml
- name: Deploy to VPS
  uses: appleboy/ssh-action@v1.0.0
  with:
    host: ${{ secrets.SSH_HOST }}
    username: ${{ secrets.SSH_USER }}
    key: ${{ secrets.SSH_KEY }}
    script: |
      cd /var/www/nova-sites-vue
      git pull origin main
      npm ci
      npm run build
      sudo cp -r dist/* /var/www/html/
      sudo systemctl reload nginx
```

## 📊 Badge Status

Thêm vào README.md:
```markdown
![CI](https://github.com/your-org/nova-sites-vue/workflows/Vue%20CI/badge.svg)
```

## 🐛 Troubleshooting

### Build failed:
- Check environment variables
- Verify all dependencies in package.json
- Check Node.js version compatibility

### Type check failed:
- Run `npm run type-check` locally
- Fix TypeScript errors
- Update tsconfig.json if needed

### Lint errors:
- Run `npm run lint -- --fix` locally
- Update ESLint config if needed

