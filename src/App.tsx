import { ChangeEvent, FC } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

library.add(fas)

const App: FC = () => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadFile = files[0]
      const formData = new FormData()
      formData.append(uploadFile.name, uploadFile)
      axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res);
      })
    }
  }
  return (
    <div className="App" style={{marginTop: '100px', marginLeft: '100px'}}>
      {/* <form method='post' encType='multipart/form-data' action='https://jsonplaceholder.typicode.com/posts'>
        <input type='file' name='myFile'/>
        <button type='submit'>submit</button>
      </form> */}
      <input type='file' name='myFile' onChange={handleFileChange}/>
    </div>
  );
}

export default App;
