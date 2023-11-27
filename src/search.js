//Trie Node
class Node{
	//Alphabet Size = 26 => we convert all letters to lowercase
	constructor(){
		this.isEnd = false ;
		this.child = [];
		for( var i=0; i<26; i++ ) {
			this.child[i] = null ;
		}
	}
}

// Trie class
class Trie{
	
	constructor(){
		this.root = new Node() ;
		this.list = [] ;
	}
	
	add( str ) {

		let curr = this.root ;
		for( var i=0; i<str.length; i++ ) {
			var index = str.charCodeAt(i) - 97 ;
			if( index<0 )
				continue;
			if( curr.child[index]==null ) 
				curr.child[index] = new Node() ;
			curr = curr.child[index];	
		}

		curr.isEnd = true ;
	}

	//helper() generates all possible postfix for given prefix 
	helper( curr , postfix , prefix ) {
		if( curr.isEnd == true ) 
			this.list.push(prefix+postfix);  //push a possible word into the list
		
		for( var i=0;i<26;i++ ){   //backtracking
			if( curr.child[i]!=null ) {
				postfix += 'abcdefghijklmnopqrstuvwxyz'.charAt(i); 
				this.helper( curr.child[i] , postfix , prefix ) ;
				postfix = postfix.substring( 0 , postfix.length-1 ) ;
			}
		}
	}
	
	findPostFix( prefix ) {
		this.list = [] ;
		let curr = this.root ;
		for( var i = 0 ; i<prefix.length; i++ ) {
			var index = prefix.charCodeAt( i )-97 ;
			if( curr.child[index]==null ) 
				return -1 ;
			curr = curr.child[index] ;
		}

		this.helper( curr , "" , prefix ) ;  //call helper
		return curr ;
	}
}

//initialize head => global scope
const head = new Trie() ;

function insertTrie( input ){   //initialize the trie with all the words 
	for( var i = 0 ; i<370104 ; i++ ) 
		head.add(input[i]) ;
}

function searchEngine( word ){
	var result = head.findPostFix( word ) ;
	return( head.list ) ;
}

// $(document).ready(function(){ ... }); => syntax in jQuery
// waits for the HTML document to be fully loaded before executing the code inside the function
// JS code does not run until the DOM (Document Object Model) is ready
// '$' is alias for 'jquery'
$(document).ready(function(){  

	// $.get() => jQuery => GET request to the specified URL. 
	// 1st argument is the URL to which the request is made 
	// 2nd argument is a callback function that will be executed once the request is successful
	$.get("https://raw.githubusercontent.com/veduKaGit/auto-trie-only-txt/main/words.txt",function(data){
		var input = data.split("\n") ;
		insertTrie(input) ;  //insert words into trie
	});
	
	$('.input').on('keyup',function(event){  // jQuery => event handler for 'keyup' event on elements with the class ".input" => whwnwver key pressed => callback function runs
		var input = $(this).val();  //get value of input
		if( input.length>0){
			input = input.toLowerCase();   //make everything lowercase => since each trie node has 26 children

			var arr = searchEngine(input);  //return arr of all results
			
			var words ="" ;
			for( var i=0; i<arr.length; i++ ) {
				words += "<div class='words'>"+ arr[i] +"</div>"   //return the results to html page => display them using "words" class
			}

			$('.display-result').text('') ;  // clear the text of this class => once i type/remove some letters => new results should be displayed
			$('.display-result').append( words ) ;	// .append adds 'words' to '.display-results' class => then displays removing the inverted commas of string
		}
		else $('.display-result').text('') ;

	});
});

