import React, { useState, useEffect, useRef } from 'react';

export default function MenuEditor() {
  const backend = 'http://localhost:5000';

  const fileInputRef = useRef(null);
  const [cat, setCat] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [catFormState, setCatFormState] = useState('');
  const [catEditId, setCatEditId] = useState(null);

  const [menuFormState, setMenuFormState] = useState({
    category_id: '',
    name: '',
    description: '',
    price: '',
    available: true,
    image: null,
  });
  const [menuEditItemId, setMenuEditItemId] = useState(null);
  const [filterCategoryId, setFilterCategoryId] = useState('all');

  // Fetch categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Whenever the filter changes, fetch items accordingly
  useEffect(() => {
    if (filterCategoryId === 'all') {
      fetchItems();
    } else {
      fetchItemsByCategory(filterCategoryId);
    }
  }, [filterCategoryId]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${backend}/getcategory`);
      if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
      const data = await res.json();
      setCat(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Fetch all menu items
  const fetchItems = async () => {
    try {
      const res = await fetch(`${backend}/getallitems`);
      if (!res.ok) throw new Error(`Failed to fetch items: ${res.status}`);
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  // Fetch items filtered by a specific category
  const fetchItemsByCategory = async (categoryId) => {
    try {
      const res = await fetch(`${backend}/getitemsbycategory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: categoryId }),
      });
      if (!res.ok) throw new Error(`Failed to fetch items by category: ${res.status}`);
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      console.error('Error fetching items by category:', err);
    }
  };

  const handleCatChange = e => setCatFormState(e.target.value);

  const handleMenuChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file' && files) {
      setMenuFormState(prev => ({ ...prev, image: files[0] }));
    } else {
      setMenuFormState(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleAddCategory = async () => {
    if (!catFormState.trim()) return;
    try {
      await fetch(`${backend}/addcategory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: catFormState }),
      });
      setCatFormState('');
      fetchCategories();
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  const handleEditCategory = id => {
    const selected = cat.find(c => c.id === id);
    if (selected) {
      setCatEditId(id);
      setCatFormState(selected.name);
    }
  };

  const handleCancelCategoryEdit = () => {
    setCatEditId(null);
    setCatFormState('');
  };

  const handleUpdateCategory = async () => {
    try {
      await fetch(`${backend}/updatecategory`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: catEditId, name: catFormState }),
      });
      setCatEditId(null);
      setCatFormState('');
      fetchCategories();
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };

  const handleDeleteItem = async id => {
    try {
      await fetch(`${backend}/deleteitem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      // After deletion, reload items based on the current filter
      if (filterCategoryId === 'all') {
        fetchItems();
      } else {
        fetchItemsByCategory(filterCategoryId);
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleAddMenuItem = async () => {
    const { category_id, name, description, price, available, image } = menuFormState;
    if (!(category_id && name && description && price)) return;

    const formData = new FormData();
    formData.append('category_id', category_id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('available', available);
    if (image) formData.append('image', image);

    try {
      await fetch(`${backend}/addnewitem`, {
        method: 'POST',
        body: formData,
      });
      setMenuFormState({
        category_id: '',
        name: '',
        description: '',
        price: '',
        available: true,
        image: null,
      });
      if (filterCategoryId === 'all') {
        fetchItems();
      } else {
        fetchItemsByCategory(filterCategoryId);
      }
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const handleEditMenuItem = id => {
    const item = menuItems.find(i => i.id === id);
    if (item) {
      setMenuEditItemId(id);
      setMenuFormState({
        category_id: item.category_id.toString(),
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        available: item.available,
        image: null,
      });
    }
  };

  const handleUpdateMenuItem = async () => {
    const { category_id, name, description, price, available, image } = menuFormState;
    const formData = new FormData();
    formData.append('id', menuEditItemId);
    formData.append('category_id', category_id);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('available', available);
    if (image) formData.append('image', image);

    try {
      await fetch(`${backend}/updateitem`, {
        method: 'PUT',
        body: formData,
      });
      setMenuEditItemId(null);
      setMenuFormState({
        category_id: '',
        name: '',
        description: '',
        price: '',
        available: true,
        image: null,
      });
      if (filterCategoryId === 'all') {
        fetchItems();
      } else {
        fetchItemsByCategory(filterCategoryId);
      }
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  const handleFilterChange = e => {
    setFilterCategoryId(e.target.value);
  };

  return (
    <div className="w-full bg-gray-100">
      {/* Category Editor */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            placeholder="Category Name"
            value={catFormState}
            onChange={handleCatChange}
            className="border p-2 rounded flex-1"
          />
          {catEditId ? (
            <>
              <button onClick={handleUpdateCategory} className="bg-blue-500 text-white px-4 py-2 rounded">
                Update
              </button>
              <button onClick={handleCancelCategoryEdit} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleAddCategory}
              className="bg-prime hover:bg-second text-white px-4 py-2 rounded"
            >
              Add
            </button>
          )}
        </div>
        <ul className="overflow-y-scroll h-44 p-2">
          {cat.map(c => (
            <li key={c.id} className="flex justify-between py-2 border-b">
              <span>{c.name}</span>
              <button onClick={() => handleEditCategory(c.id)} className="bg-yellow-500 px-2 py-1 rounded">
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Menu Item Editor */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Menu Items</h2>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="md:w-1/2 bg-gray-50 p-4 rounded">
            <div className="flex flex-col space-y-4">
              <select
                name="category_id"
                value={menuFormState.category_id}
                onChange={handleMenuChange}
                className="border p-2 rounded"
              >
                <option value="">Select Category</option>
                {cat.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={menuFormState.name}
                onChange={handleMenuChange}
                className="border p-2 rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={menuFormState.description}
                onChange={handleMenuChange}
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={menuFormState.price}
                onChange={handleMenuChange}
                className="border p-2 rounded"
                step="0.01"
              />
              <div>
                <label className="block mb-1">Image:</label>
                {menuFormState.image ? (
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(menuFormState.image)}
                      alt="Preview"
                      className="h-24 w-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setMenuFormState(prev => ({ ...prev, image: null }))}
                      className="absolute top-0 right-0 bg-white rounded-full p-1 shadow"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="bg-prime px-4 py-2 rounded"
                  >
                    Add Image
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleMenuChange}
                  className="hidden"
                />
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="available"
                  checked={menuFormState.available}
                  onChange={handleMenuChange}
                />
                <span>Available</span>
              </label>
              {menuEditItemId ? (
                <div className="flex justify-between">
                  <button onClick={handleUpdateMenuItem} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Item
                  </button>
                  <button
                    onClick={() => {
                      setMenuEditItemId(null);
                      setMenuFormState({
                        category_id: '',
                        name: '',
                        description: '',
                        price: '',
                        available: true,
                        image: null,
                      });
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={handleAddMenuItem} className="bg-prime px-4 py-2 rounded">
                  Add Item
                </button>
              )}
            </div>
          </div>
          <div className="md:w-1/2 bg-gray-50 p-4 rounded mt-4 md:mt-0">
            <h3 className="text-lg font-semibold mb-2">Items:</h3>
            <select
              value={filterCategoryId}
              onChange={handleFilterChange}
              className="border p-2 rounded mb-4 w-full"
            >
              <option value="all">All Categories</option>
              {cat.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ul className="overflow-y-scroll h-94 p-2">
              {menuItems.map(item => (
                <li key={item.id} className="flex justify-between py-2 border-b">
                  <span>
                    <strong>{cat.find(c => c.id === item.category_id)?.name || 'Unknown'}:</strong>{' '}
                    {item.name} - ${parseFloat(item.price).toFixed(2)}
                  </span>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditMenuItem(item.id)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
