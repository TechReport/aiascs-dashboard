import React, { useState } from 'react'
import { settingsAPI } from './settingsAPI'
// import settingsAPI from './settingsAPI'

export default function Settings() {
    const [oldPass, setOldPass] = useState()
    const [newPass, setNewPass] = useState()
    const [reNewPass, setReNewPass] = useState()
    const [loading, setLoading] = useState(false)

    const [message, setMessage] = useState({ status: '', data: '' })

    async function handleChangePassword(e) {
        e.preventDefault()
        setLoading(true)
        setMessage({ status: '', data: '' })

        settingsAPI.changePassword(oldPass, newPass)
            .then(response => {
                setLoading(false)
                console.log(response)
                setOldPass('')
                setNewPass('')
                setReNewPass('')
                setMessage({ status: 'success', data: response.message })
            }).catch(error => {
                console.log(error)
                setLoading(false)
                if (error.response)
                    return setMessage({ status: 'danger', data: error.response.message })
            })
    }

    return (
        <div>
            <div className="row w-100 mt-4 ml-1">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">
                            Change Password
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleChangePassword} className="form-row">
                                <div className="col-12">
                                    <label htmlFor="">Old Password</label>
                                    <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} className="form-control" />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="">New Password</label>
                                    <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="form-control" required />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="">Repea New Password</label>
                                    <input type="password" value={reNewPass} onChange={(e) => setReNewPass(e.target.value)} className="form-control" required />
                                </div>
                                <button className="btn btn-info btn-block btn-sm mt-4" type='submit' disabled={loading || newPass !== reNewPass}>Save New Password</button>
                            </form>
                            {message.status &&
                                <div className={`alert alert-${message.status} mt-3 text-center`}>{message.data}</div>
                            }

                        </div>
                        {/* <div className="alert alert-info">Password changed successfully</div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
