import { Suspense, useReducer, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome'
import { useAuth } from 'include/components/useAuth';
import { APIGet } from "include/components/APIRequest";

// ----------------------------------------------------
// Define the DataTable interface and types
// ----------------------------------------------------
type SortDir = "ASC" | "DESC" | null | undefined

interface dataInfo
{
    count: number,
    rows: any[]
}

interface DTInterface
{
    columns: any[],
    data?: dataInfo,
    striped?: boolean,
    bordered?: boolean,
    sortable?: boolean,
    variant?: string,
    size?: string,
    sortBy?: string | null | undefined,
    sortDir?: string | null | undefined,
    page?: number | null | undefined,
    limit?: number | null | undefined,
    filterText?: string,
    children?: any | null | undefined
}
type DTProps = DTInterface | null | undefined

interface DTHeadInterface
{
    columns: any[],
    sortBy?: string | null | undefined,
    sortDir?: string | null | undefined,
    children?: any | null | undefined
}
type DTHeadProps = DTHeadInterface | null

interface DTBodyInterface
{
    columns: any[],
    data?: dataInfo,
    filterText?: string | null | undefined,
    children?: any | null | undefined
}
type DTBodyProps = DTBodyInterface | null

interface DTFootInterface
{
    children?: any | null | undefined
}
type DTFootProps = DTFootInterface | null

interface col
{
    id?: string,
    text: string,
    field: string,
    sortable?: boolean,
    className?: string
}

/*
Not sure this is ever needed
const DefaultDTOptions: DTInterface =
{
    columns: [],
    data: { count: 0, rows: []},
    striped: false,
    bordered: false,
    sortable: false
}
*/
/**
 * Reducer function for the options state
 * @param state
 * @param action
 * @returns
 */
const DTReducer = (state, action) =>
{
    switch (action.attribute)
    {
        case 'error':
        {
            return {
                ...state,
                error: action.val
            };
        }
        default :
            return {
                ...state,
                [action.attribute]: action.val
            };
    }
}

/**
 * Table Cell
 * @param string id
 * @param string className
 * @param ...rest
 * @returns <td>
 */
const TD = ({id, className, ...props}) =>
{
    const [editable, setEditable] = useState(false);
    const [val, setVal] = useState(props.children);

    const OpenEdit = (e) =>
    {
        setEditable(true);
    }
    const CloseEdit = (e) =>
    {
        setEditable(false);
    }
    const SetVal = (e) =>
    {
        setVal(e.currentTarget.innerHTML);
    }

    return <td id={id} key={id} className={className} onClick={OpenEdit} onBlur={CloseEdit} contentEditable={editable} onChange={SetVal}>{val}</td>
}

/**
 * Sortable a tag in the header cell
 * @param string dir
 * @param string to
 * @returns
 */
const THSort = ({dir, to}) =>
{
    let img = (<FAI icon='sort' color='grey' />)
    if (dir == 'ASC') img = (<FAI icon='sort-up' color='SteelBlue' />)
    else if (dir == 'DESC') img = (<FAI icon='sort-down' color='SteelBlue' />)

    return (<a className='sorter ms-1' href={to}>{img}</a>)
}

/**
 * DataTable head
 * @param <DTHeadProps> props
 * @returns <thead>
 */
const DTHead = (props: DTHeadProps) =>
{
    let thCells;

    const SortTable = (sortBy: string, newDir: string) =>
    {
        return "?sortBy="+sortBy+"&sortDir="+newDir
    }

    let nextDir = (props?.sortDir == 'ASC') ? "DESC" : "ASC";

    if (props?.columns)
    {
        thCells = props.columns.map((cell:col) =>
        {
            let dir = (cell.field == props.sortBy) ? props.sortDir : null;
            let sorter = (cell.sortable) ? <THSort to={SortTable(cell.field, nextDir)} dir={dir} /> : "";

            return (<th id={cell.id} key={cell.id} className={cell.className}>{cell.text}{sorter}</th>);
        })
    }

    return (<thead><tr>{thCells}</tr></thead>)
}

/**
 * DataTable body
 * @param <DTBodyProps> props
 * @returns <tbody>
 */
const DTBody = (props: DTBodyProps) =>
{
    let trows;

    let search = (props?.filterText) ? props.filterText.toLowerCase() : "";

    if (props?.data?.rows)
    {
        trows = props.data.rows.map((row: any, rindex) =>
        {
            let tcells;
            let cellText = "";
            if (props?.columns)
            {
                tcells = props.columns.map((cell:col, cindex) =>
                {
                    cellText += (row[cell.field])  ? row[cell.field].toString().toLowerCase() : "";
                    return (<TD id={"td-"+cell.id+"-"+rindex+"-"+cindex} className={cell.className}>{row[cell.field]}</TD>);
                })
            }

            // User filter
            if (cellText.indexOf(search) === -1)
            {
                return;
            }

            return (<tr id={"tr-"+rindex} key={"tr-"+rindex}>{tcells}</tr>);
        })
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <tbody>{trows}</tbody>
        </Suspense>
    )
}

/**
 * DataTable foot
 * @param <DTFootProps> props
 * @returns <tfoot>
 */
const DTFoot = (props: DTFootProps) =>
{
    const tdCells = [];

    return (<tfoot><tr>{tdCells}</tr></tfoot>)
}

/**
 * DataTable
 * @param <DTProps> props
 * @returns <Table>
 */
export const DataTable = (props: DTProps) =>
{
    const [options, dispatch] = useReducer(DTReducer, props);
    const auth = useAuth();

    const SetFilterText = (e) =>
    {
        dispatch({attribute: 'filterText', val: e.currentTarget.value})
    }

    useEffect(() => {

        if (auth.user.isAuthenticated)
        {
            let sortBy = options.sortBy;
            let sortDir = options.sortDir ? options.sortDir : 'ASC';
            let page = options.page ? options.page : 1;
            let limit = options.limit ? options.limit : 100;
            let api_url = "/users?page="+page+"&limit="+limit
            if (sortBy)
            {
                api_url += "&sortBy="+sortBy+"&sortDir="+sortDir
            }
            // Get the user list
            APIGet(api_url)
                .then((res) =>
                {
                    dispatch({attribute: 'data', val: res.data})
                })
                .catch(error =>
                {
                    console.log("Admin (APIGet) [catch]: ", error);
                    alert("Error caught trying to GET user list");
                });
        }
    },[auth.user])

    return (<div>
        <div className='row'>
            <label className='col-9 text-end col-form-label'>Search:</label>
            <div className='col-3'>
                <input type='text' id='filter'
                    className='form-control' value={options.filterText}
                    onChange={SetFilterText}
                    placeholder='Search/Filter'
                />
            </div>
        </div>
        <Table {...options}>
            <DTHead {...options}/>
            <DTBody {...options} />
            <DTFoot />
        </Table>
    </div>
    )
}

export default DataTable;