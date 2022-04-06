export function downloadFile(src: string, filename: string) {
  // const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = src;
  link.setAttribute('download', filename);

  document.body.appendChild(link);

  link.click();
  link.remove();
}
