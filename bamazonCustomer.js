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
})

function start() {
    console.log("Displaying list of products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // For each product, display ID, name and price
        for (let i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].id} | Name: ${res[i].product_name} | Price: ${res[i].price}`);
        }
        inquirer.prompt([{
                type: "input",
                name: "item",
                message: "Enter ID of product you would like to purchase.\n"
            },
            {
                type: "input",
                name: "units",
                message: "Enter a numeric value for how many units of the product you would like to purchase.\n"
            }
        ]).then(function (buy) {
            let id = buy.item;
            let units = parseInt(buy.units);
            // Looks into database
            connection.query("SELECT * FROM products WHERE ?", {
                    id: id
                },
                function (err, results) {
                    if (err) throw err;
                    // Check if there is enough units in stock
                    if (units <= results[0].stock_quantity) {
                        console.log("Enough in stock.\n");
                        console.log("Updating products...\n");
                        connection.query("UPDATE products SET ? WHERE ?", [{
                                    stock_quantity: (results[0].stock_quantity - units)
                                },
                                {
                                    id: id
                                }
                            ],
                            function (err, res) {
                                if (err) throw err;
                                console.log(res.affectedRows + " product(s) updated!\n");
                                console.log("Your total is $" + results[0].price * units + ".");
                                console.log("Thank you!\n");
                                buyAnother();
                            })
                    } else {
                        console.log("Insufficient quantity!\n");
                        buyAnother();
                    }
                })
        })
    })
}

function buyAnother() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to make another purchase?",
            name: "another",
            choices: ["Yes", "No"]
        }
    ]).then(function(response) {
        switch(response.another) {
            case "Yes":
            start();
            break;

            case "No":
            null;
            connection.end();
        }
    })
}