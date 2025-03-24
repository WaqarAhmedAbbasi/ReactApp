const DynamicForm = () => {
    const [items, setItems] = React.useState([]);
    const [newItem, setNewItem] = React.useState('');
    const [editIndex, setEditIndex] = React.useState(null);
    const [editItem, setEditItem] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1); // Track current page
    const [itemsPerPage] = React.useState(5); // Set the number of items per page (you can change this value)

    // Calculate the current page items to be displayed
    const [currentItems, setCurrentItems] = React.useState([]);

    React.useEffect(() => {
        // Fetch data from the .NET MVC controller
        const fetchItems = async () => {
            try {
                const response = await fetch('/Home/GetItems');
                const data = await response.json(); // No need to parse here, as it's already parsed
                setCurrentItems(data.slice(((currentPage - 1) * itemsPerPage),(currentPage * itemsPerPage)));
                setItems(data); // Set the fetched data to the items state   
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [items]); // Empty dependency array ensures this runs only once when the component mounts

    React.useEffect(() => {
        setCurrentItems(items.slice(
            ((currentPage - 1) * itemsPerPage),
            (currentPage * itemsPerPage)
        ));
    }, [currentPage, items]); // <- add the count variable here

    const handleAddItem = async () => {
        if (newItem.trim() !== '') {
            try {
                const response = await fetch('/Home/AddItem', {  // URL for the controller action
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',  // Sending JSON data
                    },
                    body: JSON.stringify({ id : newItem })
                });

                if (response.ok) {
                    const result = await response.json();  // Assuming the server sends a response as JSON
                    if (result.success === true) {
                        setItems(result.items);
                        setNewItem('');
                    }
                    else
                    {
                        console.log(result.message);
                    }
                } else {
                    console.error('Error adding item:', response.statusText);
                }
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    };


    // Delete item
    const handleDeleteItem = async ({ item }) => {
        try {
            const response = await fetch('/Home/DeleteItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: item }) // Sending the item ID as JSON
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success === true) {
                    setItems(result.items);
                } else {
                    console.error('Error deleting item:', result.message);
                }
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    //// Edit item
    const handleEditItem = (itemm) => {
        setEditIndex(items.findIndex(item => item === itemm));
        setEditItem(itemm);
    };

    const handleSaveEdit = async () => {

        try {
            const updatedItems = items.map((item, index) =>
                index === editIndex ? editItem : item
            );

            const response = await fetch('/Home/EditItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedItems) // Sending the item ID as JSON
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success === true) {
                    setItems(result.items);
                    setEditIndex(null);
                    setEditItem('');
                } else {
                    console.error(result.message);
                }
            } else {
                console.error('Failed to edit item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }

        
    };


    // Handle pagination controls
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handleLogout = async () => {
        try {
            // Perform the logout on the server-side (clear server-side session, token, etc.)
            const response = await fetch('/Home/Logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result.success) {
                // Clear authentication data from localStorage or sessionStorage
                localStorage.removeItem('authToken');  // Or use sessionStorage.removeItem()

                // Optionally clear cookies if you're using cookies for authentication
                document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                // Redirect to the login page
                window.location.href = '/Home/Index';
            } else {
                console.error('Error logging out:', result.message);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Dynamic Form with Add, Edit, Delete and Pagination</h3>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter new item"
                />
                <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleAddItem()}
                >
                    Add Item
                </button>
            </div>

            {editIndex !== null && (
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={editItem}
                        onChange={(e) => setEditItem(e.target.value)}
                    />
                    <button
                        className="btn btn-success mt-2"
                        onClick={handleSaveEdit}
                    >
                        Save Edit
                    </button>
                </div>
            )}

            <ul className="list-group">
                {currentItems.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        {item}
                        <div>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEditItem(item)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteItem({ item })}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="mt-3">
                <button
                    className="btn btn-secondary me-2"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button
                    className="btn btn-secondary ms-2"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <div>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

ReactDOM.render(<DynamicForm />, document.getElementById('root'));
