//bank Account interface
import inquirer from "inquirer";
// class of bank accoont
class bankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit money
    Withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of ${amount} Successful. remaining balance:${this.balance}`);
        }
        else {
            console.log("Insufficient balance");
        }
    }
    // Credit money
    Deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log(`Deposite of ${amount} Successfull.Remaining balance is ${this.balance}`);
    }
    //check balance
    checkbalance() {
        console.log(`Current balance : ${this.balance}`);
    }
}
//customer class
class Customer {
    firstName;
    lastName;
    Gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.Gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
const account = [
    new bankAccount(1001, 500),
    new bankAccount(1002, 1000),
    new bankAccount(1003, 2000)
];
// create custome
const customers = [
    new Customer("Hamza", "khan", "male", 32, 3122433567, account[0]),
    new Customer("Saba", 'sabir', "female", 29, 3332223334, account[1]),
    new Customer("Nadeem", 'khan', "Male", 31, 3162233341, account[2])
];
// function to intract with bank acoount
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: 'Enter your account number:'
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Wellcome , ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: 'Select an Operation:',
                    choices: ["Deposit", "Withdraw", "check balance", "Exit"],
                }
            ]);
            switch (ans.select) {
                case "Deposit":
                    const DepositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: 'Enter the amount to deposite:'
                    });
                    customer.account.Deposit(DepositAmount.amount);
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: 'Enter the amount to withdraw:',
                    });
                    customer.account.Withdraw(WithdrawAmount.amount);
                    break;
                //checkbalance
                case "check balance":
                    customer.account.checkbalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program");
                    console.log("\n Thank you for using our bank service.Have great Day");
                    return;
            }
        }
        else {
            console.log("Invalid account number.Please try again.");
        }
    } while (true);
}
service();
