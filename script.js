document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu');const nav=document.querySelector('#nav');menu.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));

// Local preview only. Files are never uploaded or permanently stored.
const certificateInput = document.getElementById('certificate-files');
const certificatePreview = document.getElementById('certificate-preview');
const certificateStatus = document.getElementById('certificate-status');
let certificateObjectUrls = [];
if (certificateInput && certificatePreview) {
  certificateInput.addEventListener('change', () => {
    certificateObjectUrls.forEach(url => URL.revokeObjectURL(url));
    certificateObjectUrls = [];
    certificatePreview.replaceChildren();
    const files = [...certificateInput.files];
    certificateStatus.textContent = files.length ? `${files.length} file(s) selected — preview only, not saved.` : 'No files selected.';
    for (const file of files) {
      if (!['image/jpeg','image/png','image/webp','application/pdf'].includes(file.type)) continue;
      const url = URL.createObjectURL(file);
      certificateObjectUrls.push(url);
      const card = document.createElement('article'); card.className = 'certificate-item';
      if (file.type.startsWith('image/')) {
        const img = document.createElement('img'); img.src = url; img.alt = `Preview of ${file.name}`; card.append(img);
      } else {
        const icon = document.createElement('div'); icon.className = 'certificate-file-icon'; icon.textContent = 'PDF'; card.append(icon);
      }
      const name = document.createElement('h3'); name.textContent = file.name; card.append(name);
      const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Open certificate ↗'; card.append(link);
      certificatePreview.append(card);
    }
  });
}
