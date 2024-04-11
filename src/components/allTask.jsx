import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios';
import Swal from 'sweetalert2';
import Navigation from './navigation';

const allTask = () => {
    


  return (
    <>
      <div style={{marginLeft:"300px"}}>All Task
        <table>
            <thead>
                <tr>
                    <th scope="col" className="px-6 py-3">TASK</th>
                    <th scope="col" className="px-6 py-3">CATEGORY</th>
                    <th scope="col" className="px-6 py-3">STATUS</th>
                </tr>
            </thead>
        </table>
      </div>
    </>
  )
}

export default allTask;