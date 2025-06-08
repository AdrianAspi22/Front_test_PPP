import { formatDate } from "@angular/common";

export function convertDateToRequest(
  date,
  format: "date" | "datetime" | "periodo"
) {
  switch (format) {
    case "date":
      return date == null
        ? null
        : formatDate(new Date(date), "yyyy-MM-dd", "en-ES");
    case "periodo":
      return date == null
        ? null
        : formatDate(new Date(date), "yyyy-MM", "en-ES");
    case "datetime":
      return date == null
        ? null
        : formatDate(new Date(date), "yyyy-MM-dd hh:mm:ss", "en-ES");
  }
}

/* export function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64 = base64String.split(',')[1]; // Remove the prefix
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
} */

  export function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result as string;
        if (base64String && typeof base64String === 'string' && base64String.startsWith('data:')) {
          const base64 = base64String.split(',')[1]; // Remove the prefix
          resolve(base64);
        } else {
          reject(new Error('Invalid base64 format'));
        }
      };
      
      reader.onerror = (error) => reject(error);
      
      reader.readAsDataURL(file);
    });
  }
  

