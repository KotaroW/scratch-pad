<?php
/***************************************************************************
 * file: simple_getter_setter.php
 * date: 29 June, 2015
 * Description: simple getter and setter.
***************************************************************************/


class TestClass {
	private $val1;
	private $val2;
	private $val3;

	public function __construct ( $val1, $val2, $val3 ) {
		$this->val1 = $val1;
		$this->val2 = $val2;
		$this->val3 = $val3;
	}

	public function getter ($prop) {
	  /*
	  for example -> $class_instance->getter ( 'val1' );
	  */
		return $this->$prop;
	}

	public function setter ( $prop, $new_val ) {
	  /*
	  ex -> $class_instance->setter ( 'val1', 'a new value' );
	  */
		$this->$prop = $new_val;
	}
}

?>
