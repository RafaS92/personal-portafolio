import React from 'react';
import './About.css';
import translate from '../i18n/translate';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function About() {
  return (
      <div className='flex-container'>
        <div className='flex-container-img'>
          <img
            alt=''
            src='https://www.ushccvirtual.com/wp-content/uploads/2020/09/Nelson-Vanegas-IMG_3958-cropped-edit-II-150x150.jpg'
          />
        </div>
        <Container className="flex-container-text">
        <Typography>
        Aliqua cupidatat sint velit fugiat mollit eu sit adipisicing elit consequat amet amet. Est voluptate adipisicing laboris laboris ex commodo ad consequat commodo est anim. Ullamco deserunt do adipisicing est dolor consectetur consequat non nostrud consequat proident qui id. Incididunt et minim irure reprehenderit minim sunt. Lorem eiusmod anim sunt esse veniam. Anim minim ea cupidatat ipsum reprehenderit anim consectetur.

Ullamco velit ea dolore qui pariatur ex pariatur. Laboris dolore aliqua do reprehenderit. Minim ullamco elit eu aute veniam fugiat nulla sit. Do nulla anim ea consequat Lorem aliqua non proident exercitation enim. Nulla eiusmod ut pariatur elit ut dolor excepteur elit adipisicing adipisicing. Lorem aliqua veniam id occaecat laboris sit consequat qui exercitation occaecat veniam qui.

Ipsum occaecat velit magna tempor nisi ea cupidatat veniam. Nisi veniam consequat duis consectetur in deserunt commodo voluptate in eu. Minim ullamco ex consectetur quis pariatur anim minim aliquip nisi minim ad dolore.

Est consectetur dolor est fugiat voluptate incididunt esse elit exercitation fugiat dolore commodo non. Sit irure do eu sit commodo laboris sunt. Dolore reprehenderit tempor tempor incididunt consequat do proident anim consectetur dolor nisi Lorem incididunt. Dolor anim ex adipisicing quis aute nulla.
        </Typography>
        
        </Container>
      </div>
  );
}

export default About;

