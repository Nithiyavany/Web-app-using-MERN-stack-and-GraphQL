import React from 'react';

function Home(props) {
    return (
        <div className="container mt-5">
            <h2 className="text-center">Welcome to Student and Course Management System</h2>
            <p className="lead text-center">
                This system allows you to manage students and courses effectively. You can perform various operations such as adding, listing, updating, and deleting students and courses.
            </p>
            <div className="text-center mb-4">
                <img src="https://img.freepik.com/free-photo/young-students-learning-together-during-group-study_23-2149211067.jpg?w=2000&t=st=1707786328~exp=1707786928~hmac=89c0e79dee4f014a6e1f50264c3679406e3a0bc436cb25620f637f32dbc443dd" alt="Education" style={{ maxWidth: '80%', maxHeight: '60%', height: 'auto' }} />
            </div>
           
            <p>Get started by navigating to the respective pages to manage students and courses.</p>
        </div>
    );
}

export default Home;
