export const downloadCV = (): void => {
  fetch('Kyochul_Jang___CV.pdf')
    .then((response) => response.blob())
    .then((blob) => {
      const fileURL = window.URL.createObjectURL(blob);
      const alink = document.createElement('a');
      alink.href = fileURL;
      alink.download = 'Kyochul_Resume.pdf';
      alink.click();
      window.URL.revokeObjectURL(fileURL);
    })
    .catch((error) => {
      console.error('Error downloading resume:', error);
    });
};
