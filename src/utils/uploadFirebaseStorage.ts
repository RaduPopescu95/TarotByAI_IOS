import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { authentication, storage } from "../../firebase";
import { getBlobFromUri } from "./getBlobFromUri";

export const uploadImage = async (images, initialImages) => {
  const auth = authentication;
  let clinicImag = [];
  let clinicImagesURI = [];
  try {
    console.log("images...", images);
    console.log("initialImages...", initialImages);

    if (initialImages.length > 0) {
      console.log("YESSSS");

      for (let i = 0; i < images.length; i++) {
        // UPLOAD NEW IMAGES AND DOWNLOAD THEIR LINK
        const fileName = Date.now() + i;

        const storageRef = ref(
          storage,
          `images/clinics/${auth.currentUser.uid}/${fileName}`
        );
        clinicImag.push({ img: `${fileName}`, isMainImg: images[i].isMainImg });

        console.log(`images[.........${i}............].img`, images[i].img);

        const bytes = await getBlobFromUri(images[i].img);

        // console.log("bytes......");
        // console.log(bytes);

        const metadata = {
          contentType: "image/jpeg",
        };

        const snapshot = await uploadBytes(storageRef, bytes, metadata);

        // Get the download URL for the uploaded image
        const finalUri = await getDownloadURL(snapshot.ref);

        console.log("after if initial images exist", finalUri);
        clinicImagesURI.push({
          img: `${finalUri}`,
          isMainImg: images[i].isMainImg,
        });

        console.log(`Finish.....${i}.......`);
      }

      // DELETE ALL IMAGES FROM STORAGE
      for (let i = 0; i < initialImages.length; i++) {
        console.log(initialImages[i].img);
        const storageRef = ref(
          storage,
          `images/clinics/${auth.currentUser.uid}/${initialImages[i].img}`
        );

        await deleteObject(storageRef)
          .then(() => {
            // File deleted successfully
            console.log("File deleted successfully");
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(
              "// Uh-oh, an error occurred!...deleting file from storage clinic images...",
              error
            );
          });
      }
    } else {
      console.log("elsee....");

      for (let i = 0; i < images.length; i++) {
        console.log(Date.now() + i);

        const fileName = Date.now() + i;
        // const fileName = images[i].img.split("/").pop();
        console.log("fileName...", fileName);
        // const fileType = fileName.split(".").pop();
        const storageRef = ref(
          storage,
          `images/clinics/${auth.currentUser.uid}/${fileName}`
        );
        clinicImag.push({ img: `${fileName}`, isMainImg: images[i].isMainImg });

        const bytes = await getBlobFromUri(images[i].img);

        console.log("bytes......");
        console.log(bytes);
        // console.log("bytes......");
        // console.log(bytes);

        const metadata = {
          contentType: "image/jpeg",
        };

        const snapshot = await uploadBytes(storageRef, bytes, metadata);

        // Get the download URL for the uploaded image
        const finalUri = await getDownloadURL(snapshot.ref);

        console.log("after", finalUri);
        clinicImagesURI.push({
          img: `${finalUri}`,
          isMainImg: images[i].isMainImg,
        });
      }
    }
  } catch (err) {
    console.log("error uploading clinic images to storage...", err);
  }

  console.log("clinic images....");
  console.log(clinicImag);
  console.log("clinicImagesURI.....");
  console.log(clinicImagesURI);
  return { clinicImag, clinicImagesURI };
};

export const uploadDoctorImage = async (image, isPatientImage) => {
  const auth = authentication;
  let doctorImag = "";
  let doctorImagURI = "";
  console.log("TEST 1");
  try {
    // const fileName = image.split("/").pop();
    const fileName = Date.now();
    console.log("fileName...", fileName);
    let storageRef;
    // const fileType = fileName.split(".").pop();
    console.log("TEST 2");

    if (isPatientImage) {
      storageRef = ref(storage, `images/patients/${fileName}`);
    } else {
      storageRef = ref(
        storage,
        `images/clinics/${auth.currentUser.uid}/doctors/${fileName}`
      );
    }

    console.log("TEST 3");
    doctorImag = `${fileName}`;

    const bytes = await getBlobFromUri(image);

    console.log("bytes......");
    console.log(bytes);

    const metadata = {
      contentType: "image/jpeg",
    };
    console.log("TEST 3.3");
    //  uploadBytes(storageRef, bytes);

    let uri = await uploadBytes(storageRef, bytes, metadata).then(
      (snapshot) => {
        return getDownloadURL(snapshot.ref);
      }
    );
    console.log("TEST 3.4");
    console.log("URI FOR DOCTOR", uri);
    doctorImagURI = uri;
    console.log("TEST 4");
  } catch (err) {
    console.log("error uploading clinic images to storage...", err);
  }

  return { doctorImag, doctorImagURI };
};

export const updateDoctorPatientImage = async (
  image,
  isPatientImage,
  oldImage
) => {
  const auth = authentication;
  let doctorImag = "";
  let doctorImagURI = "";
  try {
    if (oldImage.length > 0) {
      let deleteStorageRef;
      if (isPatientImage) {
        deleteStorageRef = ref(storage, `images/patients/${oldImage}`);
      } else {
        deleteStorageRef = ref(
          storage,
          `images/clinics/${auth.currentUser.uid}/doctors/${oldImage}`
        );
      }

      deleteObject(deleteStorageRef)
        .then(() => {
          // File deleted successfully
          console.log("File deleted successfully");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(
            "// Uh-oh, an error occurred!...deleting file from storage doctor/patient images...",
            error
          );
        });
    }

    const fileName = Date.now();
    console.log("fileName...", fileName);
    let storageRef;

    if (isPatientImage) {
      storageRef = ref(storage, `images/patients/${fileName}`);
    } else {
      storageRef = ref(
        storage,
        `images/clinics/${auth.currentUser.uid}/doctors/${fileName}`
      );
    }

    doctorImag = `${fileName}`;
    const bytes = await getBlobFromUri(image);

    console.log("bytes......");
    console.log(bytes);
    const metadata = {
      contentType: "image/jpeg",
    };
    //  uploadBytes(storageRef, bytes);

    let uri = await uploadBytes(storageRef, bytes, metadata).then(
      (snapshot) => {
        return getDownloadURL(snapshot.ref);
      }
    );
    doctorImagURI = uri;
  } catch (err) {
    console.log("error uploading clinic images to storage...", err);
  }

  return { doctorImag, doctorImagURI };
};
