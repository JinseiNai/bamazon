let inquirer = require("inquirer");
let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "kibazeus",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
    start();
});

function start() {
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?\n",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function (user) {
        switch (user.choice) {
            case "View Products for Sale":
                displayProducts();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;
        }
    })
}

function displayProducts() {
    console.log("Displaying list of products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].id} | Name: ${res[i].product_name} | Price: ${res[i].price} | Quantity: ${res[i].stock_quantity}`);
        }
    })
    connection.end();
}

function lowInventory() {
    console.log("Displaying low inventory items...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log(`ID: ${res[i].id} | Name: ${res[i].product_name} | Price: ${res[i].price} | Quantity: ${res[i].stock_quantity}`);
            }
        }
    })
    connection.end();
}

function addInventory() {
    inquirer.prompt([{
            type: "input",
            name: "id",
            message: "Enter an item ID.\n"
        },
        {
            type: "input",
            name: "units",
            message: "Enter an amount of units you would like to restock."
        }
    ]).then(function (response) {
            let id = response.id;
            let units = parseInt(response.units);
            connection.query("SELECT * FROM products WHERE ?", {
                id: id
            }, function (err, results) {
                    if (err) throw err;
                    connection.query("UPDATE products SET ? WHERE ?", [{
                            stock_quantity: (results[0].stock_quantity + units)
                        },
                        {
                            id: id
                        }
                    ], function(err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " product updated!\n");
                    })
                })
            })
            connection.end();
    }

    function addProduct() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Enter name of product"
            },
            {
                type: "input",
                name: "department",
                message: "Enter a department name for product",
            },
            {
                type: "input",
                name: "price",
                message: "Enter a number for price"
            },
            {
                type: "input",
                name: "quantity",
                message: "Enter a number for stock"
            }
        ]).then(function(input) {
            connection.query("INSERT INTO products SET ?", {
                product_name: input.name,
                department_name: input.department,
                price: input.price,
                stock_quantity: input.quantity
            }, function(err, res) {
                console.log(res.affectedRows + " product inserted!");
            })
        })
        connection.end();
    }