#Data Enabled Components

##Requirement
As a Web Developer, I want to work with native and Custom HTML Elements (like `<input>, <paper-checkbox>` etc. ) that support data input / output with a unified API and format for inserting and retreiving data.

##Problem

###Native Elements
There is no standardized way whereby data enabled HTMLElements (Native or Custom) can declare that they hold data, show what data they hold or tie the data to a symbol (either a backend implementation or other complex operation).

Eg:
```
<input id="field1" type="text" name="student_name" />
<input id="field2" type="check" name="hostel_student" />
<input id="field3" type="check" name="scholarship" />

//All these three work differently
document.getElementById('field1').value;
document.getElementById('field2').value;
document.getElementById('field3').value;
```
###Custom Elements
The problem is even more compounded when it comes to Custom Elements. Native HTML only gives us *hints* as to how to standardize this. 

Custom Element authors have no standard way of specifying data

##Existing Implementations

###dojo FormManager

Dojo's **Form Manager** is an implementation as found here: https://dojotoolkit.org/reference-guide/1.10/dojox/form/manager/index.html#dojox-form-manager-index

This is by far the best implementation for this problem so far but it suffers from 2 aspects.

1. It is non standardized with respect to the HTML Spec and developers need to add custom, non-standard extensions to their HTML to make it compatible with FormManager.

2. It leverages **the Dojo Ecosystem**. While not an issue in the past, today's JS libraries are very loosely coupled and have few dependencies. Even dojo has realised this with Dojo 2.   

###Polymer's **iron-form** 

https://github.com/PolymerElements/iron-form
Google's take on this is modern and supports Custom WebComponents, but the implementation lacks detail and is definitely an inferior soultion in terms of features to Dojo's.

Polymer has tried to be as standard as possible.

###Proposed Solution

**super-form** tries to combine both worlds, have a feature set as rich as Dojo's implmentation yet have the ability to support modern Web Technologies (eg: HTML5, Web Components) like Polymer in a framework agnostic way. It adds one key element to the mix. **Standardization**.

####Standardization
Building upon the **hints** given by HTML, `super-form` tries to create an API that tries to be as consistent with the HTML Spec as possible. Where we feel the spec is not practical, or limits certain feature sets, we have resorted to implementing custom solutions with consensous from the community.

####Modern
`super-form` is a Web Component. It supports both native and custom elements. Like the rest of **SuperElements**, it follows best practices regarding web component development.

