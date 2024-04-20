import CustomerModel from "../models/customerModel.js";

export const addCustomerNumber = async ({
  mobileNumber,
  customerName,
  category,
}) => {
  try {
    if (!mobileNumber || !customerName || !category) {
      throw new Error("Mobile number, customer name, and category are required.");
    }

    // Ensure category is always an array
    const categories = Array.isArray(category) ? category : [category];

    const newCustomers = categories.map((cat) => {
      return new CustomerModel({
        mobileNumber,
        customerName,
        category: cat.trim(), // Trim whitespace from category
      });
    });

    // Save all new customers asynchronously
    const savedCustomers = await Promise.all(newCustomers.map(customer => customer.save()));

    console.log("Customers added successfully:", savedCustomers);

    return savedCustomers;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error; // Re-throw the error for handling in the controller
  }
};

export const updateCustomerService = async (id, data) => {
  try {
    const updateCustomer = await CustomerModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updateCustomer;
  } catch (error) {
    console.log(error.messsage);
  }
};

export const deleteCustomerService = async (id) => {
  try {
    const deleted = await CustomerModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log(error.messsage);
  }
};

export const customerDetailsService = async () => {
  try {
    const customeDetails = await CustomerModel.find();
    return customeDetails;
  } catch (error) {
    return error.messsage;
  }
};