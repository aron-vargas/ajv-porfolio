import { useState, useEffect, useMemo } from 'react';
import { useLocation } from "react-router-dom";
import DataTable from 'include/components/DataTable'
import { useAuth } from 'include/components/useAuth';

export const Admin = (props: any) =>
{
    //if (!auth.user.isAuthenticated)
    //    return ErrorFB;
    const columns = [
        { id: 'user_id', className:'text-end', field: 'user_id', text: '#', sortable: true },
        { id: 'first_name', className:'text-start', field: 'first_name', text: 'First Name', sortable: true },
        { id: 'last_name', className:'text-start', field: 'last_name', text: 'Last Name', sortable: true },
        { id: 'email', className:'text-start', field: 'email', text: 'Email', sortable: true },
        { id: 'phone', className:'text-start', field: 'phone', text: 'Phone', sortable: true },
        { id: 'nick_name', className:'text-start', field: 'nick_name', text: 'Nickname', sortable: true },
        { id: 'user_type', className:'text-center', field: 'user_type', text: 'Type', sortable: true },
        { id: 'status', className:'text-center', field: 'status', text: 'Status', sortable: true },
        { id: 'permissions', className:'text-end', field: 'permissions', text: 'Permissions', sortable: true },
        { id: 'verification', className:'text-start', field: 'verification', text: 'Verification', sortable: true },
        { id: 'verified', className:'text-center', field: 'verified', text: 'Verified', sortable: true },
        { id: 'login_attempts', className:'text-end', field: 'login_attempts', text: 'Login Attempts', sortable: true },
        { id: 'block_expires', className:'text-center', field: 'block_expires', text: 'Block Expires', sortable: true },
        { id: 'created_on', className:'text-center', field: 'created_on', text: 'Created', sortable: true },
        { id: 'last_mod', className:'text-center', field: 'last_mod', text: 'Last Mod', sortable: true },
    ]

    // The desired tab can be passed in via the query string eg: ?tab=login-tab
    const { search } = useLocation();
    let params = useMemo(() => new URLSearchParams(search), [search]);
    let tab = params.get('tab');
    let sortBy = params.get('sortBy');
    let sortDir = params.get('sortDir') ? params.get('sortDir') : 'ASC';

    return (
        <div>
            <DataTable sortable striped size="sm" bordered columns={columns} sortBy={sortBy} sortDir={sortDir}>
                {props.children}
            </DataTable>
        </div>
    );
}

export default Admin;

