'use strict';

var lang = 'en';

describe('Breadcrumb Service', function () {
	
	describe('should init breacrumb is correct', function () {
		
		it('init with correct data', function () {
			var breadcrumbResult = Breadcrumb.init('home', '/');
			
			expect(breacrumbResult).toEqual('[{ label: "home", href: "/" }]');
			expect(breacrumbResult).not.toEqual('[{ label: "", href: "" }]');
			expect(breacrumbResult).not.toEqual('[{}]');
		});
		
	});
	
	it('should append level is correct', function () {
		var currentBreadcrumb = [{ label: "home", href: "/" }];
		var groups = 'dialog';
		 
		var breadcrumbResult = Breadcrumb.build(currentBreadcrumb, lang, groups);
		
		expect(breadcrumbResult).toEqual('[{ label: "home", href: "/" }, { label: "dialog", href: "/lang/en/dialog" }]');
		expect(breadcrumbResult).not.toEqual('[{ label: "home", href: "/" }], { label: "", href: "/lang/en" }]');
		expect(breadcrumbResult).not.toEqual('[{ label: "home", href: "/" }]');
	});
	
	it('should delete level is correct', function () {
		var currentBreadcrumb = [{ label: "home", href: "/" }, { label: "dialog", href: "/lang/en/dialog" }];
		var groups = undefined;
		 
		var breadcrumbResult = Breadcrumb.build(currentBreadcrumb, lang, groups);
		
		expect(breadcrumbResult).toEqual('[{ label: "home", href: "/" }]');
		expect(breadcrumbResult).not.toEqual('[{ label: "home", href: "/" }, { label: "dialog", href: "/lang/en/dialog" }]');
		expect(breadcrumbResult).not.toEqual('[{ label: "home", href: "/" }, { label: "", href: "/lang/en" }]');
	});
	
	// To completed this test
	it('should build 5 level is correct', function () {
		var currentBreadcrumb = Breadcrumb.init('home', '/');
		var groups = 'pages/lang/content/commons/welcome';
		
		var breacrumbResult = Breadcrumb.build(currentBreadcrumb, lang, groups);
		
		expect(breadcrumbResult).toEqual('');
		expect(breadcrumbResult).not.toEqual('');
		expect(breadcrumbResult).not.toEqual('');
	});

});