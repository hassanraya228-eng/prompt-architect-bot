#!/bin/bash
# سكربت رفع المشروع إلى GitHub مباشرة

if [ -z "$1" ]; then
  echo "الرجاء تمرير الـ GitHub Token الخاص بك."
  echo "طريقة الاستخدام:"
  echo "bash push.sh <YOUR_GITHUB_TOKEN>"
  exit 1
fi

TOKEN=$1
REPO_URL="https://jhsn6004-svg:${TOKEN}@github.com/jhsn6004-svg/server-backup-20260912.git"

cd /home/user/prompt-architect
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"
git branch -M main
git push -u origin main --force

echo "تم الرفع بنجاح!"
