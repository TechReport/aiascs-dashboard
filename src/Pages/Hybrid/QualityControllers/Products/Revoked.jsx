import React from 'react'
import ProductList from '../../Manufacturers/Products/ProductList'

export default function Revoked() {
    return (
        <div className='mt-4'>
            
            <div className="row w-100">
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <ProductList extra={{ isRevoked: true }} />

                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="jumbotron"></div>
                </div>
            </div>
        </div>
    )
}
