import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupapi } from '../services/home_service';

const Home = () => {

    useEffect(() => {
        document.title = 'Home';
        console.log('Under home')
    }, [])

    // Properties
    const [employee, setEmployee] = useState({});
    const [key, setKey] = useState('');
    // const navigate = useNavigate();

    // Signup working
    const signUp = (e) => {
        console.log('I am under the sign up handler');
        console.log(employee);
        signUpPost(employee);
        e.preventDefault();
    }

    const signUpPost = (data) => {
        signupapi(data).then((res)=>{console.log('I am under response'); console.log(res.data)},(error)=>{console.log(error)});
    }

    return (
        <div>
            <div className="text-center mt-4">
                <button type="button" className="btn btn-primary mx-auto col-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Signup
                </button>
            </div>
            <div className="container-fluid mt-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem suscipit non illo neque magnam consequatur, aliquam ut eius officiis ratione sed officia, saepe porro magni, a quidem. Minima, nemo aspernatur libero autem a blanditiis architecto doloribus, optio fugit labore atque iusto, dolorem quaerat praesentium eaque? Exercitationem quod voluptatibus quibusdam praesentium. Eaque consequatur non dolores unde, sunt voluptas doloribus ratione repellendus accusamus totam ut voluptatibus eum quia repellat maxime eos illum amet placeat qui? Eaque autem illum consequuntur, minima quia sint ea fuga natus! Quaerat voluptatum nam quidem sed exercitationem beatae ullam quam ab. Illo accusantium, mollitia harum, magni porro, aut a quis blanditiis unde libero quia cupiditate quisquam quasi! Molestiae, dolorem quae. Iusto mollitia ab asperiores quisquam tempore? Tempore architecto dolores numquam commodi, eum quia tenetur, distinctio mollitia aspernatur dolorem earum, fuga consequatur. Excepturi, maxime eligendi similique enim molestias recusandae consequatur quae asperiores culpa cum facere saepe, veniam ullam odio nulla, sunt repellendus nobis natus? Eos velit recusandae quibusdam? Quas aliquam accusantium hic maiores earum dolore inventore iste soluta impedit quibusdam, quisquam facere! Tempore, fugit! Optio, voluptate temporibus. Ipsam suscipit ut aliquam vel nihil? Aliquam ut natus repellat tempora a consectetur nulla distinctio, perferendis dolore rem repellendus odio veritatis perspiciatis sequi, maxime fuga odit? Iure ad, necessitatibus quisquam beatae doloribus, itaque, quis vel laboriosam optio quos delectus deleniti numquam nostrum nam esse inventore possimus. Itaque fuga nemo eligendi earum voluptate.
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Sign up</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={signUp}>
                                <div className="row col-12 mb-1">
                                    <div className="col-6">
                                        <label htmlFor="name">Enter name</label>
                                        <input type="text" className='form-control' id='name' name='name' onChange={(e) => { setEmployee({ ...employee, name: e.target.value }) }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="password">Enter password</label>
                                        <input type="text" className='form-control' id='password' name='password' onChange={(e) => { setEmployee({ ...employee, password: e.target.value }) }} />
                                    </div>
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="email">Enter email</label>
                                    <input type="email" className='form-control' id='email' name='email' onChange={(e) => { setEmployee({ ...employee, email: e.target.value }) }} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="address">Enter address</label>
                                    <input type="text" className='form-control' id='address' name='address' onChange={(e) => { setEmployee({ ...employee, address: e.target.value }) }} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="contact">Enter contact</label>
                                    <input type="text" className='form-control' id='contact' name='contact' onChange={(e) => { setEmployee({ ...employee, contact: e.target.value }) }} />
                                </div>
                                <div className="mb-1">
                                    <label htmlFor="department">Enter department</label>
                                    <input type="text" className='form-control' id='department' name='department' onChange={(e) => { setEmployee({ ...employee, department: e.target.value }) }} />
                                </div>
                                {/* <div className="mb-1">
                                    <label htmlFor="key">Enter key</label>
                                    <input type="text" className='form-control' id='key' name='key' onChange={(e) => { setKey({ ...key, key: e.target.value }) }} />
                                </div> */}
                                <div className="row col-12 mb-1">
                                    <div className="col-6">
                                        <label htmlFor="gender">Enter gender</label>
                                        <input type="text" className='form-control' id='gender' name='gender' onChange={(e) => { setEmployee({ ...employee, gender: e.target.value }) }} />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="role">Enter role</label>
                                        <input type="text" className='form-control' id='role' name='role' onChange={(e) => { setEmployee({ ...employee, role: e.target.value }) }} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Signup</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
