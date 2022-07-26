import { useContext } from 'react'

import renderHTML from 'react-render-html'

import moment from 'moment'

import { Avatar } from 'antd'

import PostImage from '../images/PostImage'

import { useRouter } from 'next/router'

import {HeartOutlined, HeartFilled, CommentOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'


    import {UserContext} from '../../context/index'


 const PostList = ({posts, handleDelete}) => {   
        // if using export const function1 => desturctre need like ==> export const {function1} ...


        //use bootstrap card to display nicely

        const [state] = useContext(UserContext)

        const router = useRouter()



        return (
            <>{
                // maps function only works in arrays
                posts && posts.map( (post) => (
                    <div key={post._id} className='card mb-5' >
                            <div className="card-header">
                                
                                     <Avatar size={40} className='mb-2' >
                                        {post.postedBy.name[0]}
                                    </Avatar> {' '}
                                    <span className='pt-2 ml-3' style={ { marginLeft: '1rem' }}>{post.postedBy.name} </span>
                                    <span className='pt-2 ml-3' style={ { marginLeft: '1rem' }}>{moment(post.createdAt).fromNow()} </span>
                                    
                            </div>

                            <div className="card-body" >
                                {renderHTML(post.content)}
                            </div>

                            <div className="card-footer" >
                                  {post.image && <PostImage url={post.image.url}/> }
                            
                                <div className='d-flex p-2'>
                                     <HeartOutlined className='text-danger pt-2 h5 px-2'/>
                                    <div className='pt-2 pl-3' style={ { marginRight: '1rem' }}>likes </div>

                                    <CommentOutlined className='text-danger pt-2 h5 px-2'/>
                                    <div className='pt-2 pl-3' >comments </div>

                                   {
                                    state && state.user && state.user._id === post.postedBy._id && (
                                        <>
                                        
                                        <EditOutlined onClick={ () => router.push(`/user/post/${post._id}`)} 
                                                      className='text-danger pt-2 h5 px-2 mx-auto'/>

                                        <DeleteOutlined onClick={ () => handleDelete(post)} 
                                                        className='text-danger pt-2 h5 px-2 mx-auto'/>

                                        </>
                                    )
                                   }

                                </div>
                                    
                            
                            </div>
    
                    </div>
                ))
            }</>
        )

        
           
        
 }

 export default PostList;