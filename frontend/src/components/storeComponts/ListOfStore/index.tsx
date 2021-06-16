import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './components/Card'
import api from '../../../services/api'
import './style.css';
import NavBar from '../../Header'
import Load from '../../Load'
import SearchBar from '../../SearchBar';

const posts = [
    { id: '1', name: 'This first post is about React' },
    { id: '2', name: 'This next post is about Preact' },
    { id: '3', name: 'We have yet another React post!' },
    { id: '4', name: 'This is the fourth and final post' },
];

const filterPosts = (posts, query) => {
    if (!query) {
        return posts;
    }

    return posts.filter((post) => {
        const postName = post.name.toLowerCase();
        return postName.includes(query);
    });
};   

export default function ListOfStore() {
    const [listStore, setListStore] = useState([]);
    const [loading, setLoading] = useState(true);

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(posts, searchQuery);
    
    useEffect(() => {
        api.get(`store`)
            .then(response => {
                setListStore(response.data);
                setLoading(false);
            });
    }, []);
 
console.log(filteredPosts)
    return (
        <div className="parent">
            < NavBar />
            <div className="conteudo">

            {/* <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ul>
                {filteredPosts.map(post => (
                    <li key={post.key}>{post.name}</li>
                ))}
            </ul> */}

                {!loading ? (
                    <div className="d-flex align-content-start flex-wrap" id="ListContainer">
                        {listStore && listStore.map((store: any, index: number) => (

                            <Link className="ListLink" to={`/store/${store.id}`} >
                                <Card id={store.id} name={store.name} />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Load loading={loading} />
                )}
            </div>
        </div>
    );

}

