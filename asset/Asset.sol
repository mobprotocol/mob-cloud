pragma solidity ^0.4.6;

contract Asset {
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    mapping( address => uint ) balances;
    mapping( address => mapping( address => uint ) ) approvals;

    string public name;
    string public ticker;
    uint public supply;

    function Asset(string _name, string _ticker, uint _supply) {
        name = _name;
        ticker = _ticker;
        supply = _supply;
        balances[msg.sender] = _supply;
    }

    function transfer( address to, uint value ) returns (bool) {
        if ( balances[msg.sender] < value) { throw; }
        balances[msg.sender] -= value;
        balances[to] += value;
        Transfer( msg.sender, to, value );
        return true;
    }

    function approve( address spender, uint value ) returns (bool) {
        if ( balances[msg.sender] < value ) { throw; }
        approvals[msg.sender][spender] = value;
        Approval( msg.sender, spender, value );
        return true;
    }

    function balanceOf(address who) constant returns (uint) {
        return balances[who];
    }
