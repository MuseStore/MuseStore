import * as FileSystem from 'expo-file-system';

_getAllFilesInDirectory = async() => {
    let dir = await FileSystem.readDirectoryAsync(".");
 
    dir.forEach((val) => {
      console.log(val)
 });
 
 }
async function download(path) {
console.log(FileSystem.documentDirectory)
const url = await getFileURL(path)


const downloadResumable = FileSystem.createDownloadResumable(
   url,
   "file://" + path,
   {},
);

try {
   const { uri } = await downloadResumable.downloadAsync();
   console.log('Finished downloading to ', uri);
} catch (e) {
   console.error(e);
}
}