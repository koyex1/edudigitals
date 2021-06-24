import { Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import React, { useEffect, useState } from 'react'
import { allTransactions } from '../actions/transactionActions';

function VettingScreen() {
  const[payments, setPayments] = useState();

  useEffect(() => {
   allTransactions().then(data=>{
     setPayments(data)
   })
  }, [])

    return (
        <div className="vet_table_surrounding">
    <div class="bold_font vet_table_surrounding">
        <Table
        dataSource={payments && payments.allTransactions}
      >
        <div className="edu_verify_header">
          
        <Column title="orderID"  key="orderId" 
          render={(text, record) => (
            <div className={
              record.appeal?"vet_red":"vet_green"}>{record.orderId} </div>
        )}
          />
          
          <Column title="Amount"  key="amount" 
          render={(text, record) => (
            <div>$ { record.amount} </div>
        )}
          />
          
          <Column title="Time" dataIndex="transactionTime" key="transactionTime" />


          <Column title="Tutor Name"  key="tutorname" 
          render={(text, record) => (
            <div>{ record.tutor.firstName + " "+ record.tutor.lastName} </div>
        )}
          />
           <Column title="Tutor Email"  key="tutorname" 
          render={(text, record) => (
            <div>{record.tutor.email} </div>
        )}
          />
<Column title="Appealed"  key="appeal" 
          render={(text, record) => (
            <div>{ new Boolean(record.appeal).toString()} </div>
        )}
          />
                    <Column title="Reason" dataIndex="appealReason" key="reason" />


        <Column title="Student Name"  key="tutorname" 
          render={(text, record) => (
            <div>{ record.student.firstName + " "+ record.student.lastName} </div>
        )}
          />
           <Column title="Student Email"  key="tutorname" 
          render={(text, record) => (
            <div>{ record.student.email} </div>
        )}
          />

<Column title="Completed"  key="complete" 
          render={(text, record) => (
            <div>{  new Boolean(record.complete).toString()} </div>
        )}
          />         
           <Column title="Reason" dataIndex="completeReason" key="reason" />

        </div>
        
      </Table>



    </div>
    </div>
    )
}

export default VettingScreen
