import dynamic from 'next/dynamic'
import {Avatar} from 'antd'
import {CameraOutlined} from '@ant-design/icons'

import React from 'react'


// const ReactQuill = dynamic( () => import('react-quill'), {ssr: false})
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false
  });

// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const createPostForm = ({content, setContent, postSubmit, handleImage}) => {
  return (
    <div className='card'>
        <div className='card-body pb-7'>
            <form className='form-group' onSubmit={postSubmit}>
                <ReactQuill
                          theme='snow'
                          value={content}
                          onChange={e => setContent(e)}
                          className='form-control'
                           placeholder='write content' />

                

                
            </form>
        </div>

        <div className='card-footer d-flex justify-content-between'>
                <button 
                    className='btn btn-sm btn-primary mt-1'
                    onClick={postSubmit}
                >
                    Post
                </button>


                <label>
                  <CameraOutlined className='mt-2' />
                  <input type='file' 
                         accept='images/*'
                         hidden
                         onChange={handleImage}
                          />

                </label>

        </div>
    </div>
  )
}

export default createPostForm
