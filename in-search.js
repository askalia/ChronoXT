
jQuery(document).ready(function ChronoXT()
{
	Tagadapps = {};
	Tagadapps.ChronoXT = {};
	Tagadapps.ChronoXT.inSearch = {};
	Tagadapps.ChronoXT.inSearch.SEARCH_URL = '//www.chronodrive.com/refonte/store/search/product/';

	Tagadapps.ChronoXT.inSearch.init = function()
	{
		Tagadapps.ChronoXT.inSearch.popup.init();
		Tagadapps.ChronoXT.inSearch.UI.init();
		return;
	};

	Tagadapps.ChronoXT.inSearch.openBox = function(term)
	{
		Tagadapps.ChronoXT.inSearch.init();
		Tagadapps.ChronoXT.inSearch.popup.open();
	};
	
	Tagadapps.ChronoXT.inSearch.runSearch = function(term)
	{
		if (term.length < 3)
			return false;
		Tagadapps.ChronoXT.inSearch.popup.emptyResults();
		jQuery.get(Tagadapps.ChronoXT.inSearch.SEARCH_URL+term, {}, function(html)
		{
			Tagadapps.ChronoXT.inSearch.popup.setResults(jQuery(html).find('#liste_articles'));
		});
	}
		/******************************************/

	Tagadapps.ChronoXT.inSearch.UI = {};
	Tagadapps.ChronoXT.inSearch.UI.init = function()
	{	
		Tagadapps.ChronoXT.inSearch.UI.placeSearchBox();
		Tagadapps.ChronoXT.inSearch.UI.placeOpenBoxButton();
		Tagadapps.ChronoXT.inSearch.popup.inSearchTerm.get(0).focus();
	};
	Tagadapps.ChronoXT.inSearch.UI.placeOpenBoxButton = function()
	{
		jQuery('#inSearchOpenBox').remove();
		jQuery('<div id="inSearchOpenBox" style="float: right; margin-top: 4px;"><button onclick="Tagadapps.ChronoXT.inSearch.openBox()">inSearch</button></div>')
			.insertAfter('#super_top .search form');
		
	};
	Tagadapps.ChronoXT.inSearch.UI.placeSearchBox = function()
	{
		jQuery('.insearch-dock').remove();
		Tagadapps.ChronoXT.inSearch.popup.inSearchDock = jQuery('<div class="insearch-dock">')
			.css({
				'background' : 'url("http://www.chronodrive.com/emedias/web/merchandising/rentree/2014/images/bg_search.png") no-repeat scroll 0 0 transparent',
				'margin' : '0 0 20px 40px',
				'height' : '38px',
				'width' : '274px',
				'padding-left' : '45px'
			})
			.append('<input type="text" id="insearch-term" placeholder="Rechercher..."/>')
			.append('<button class="insearch-term-send"></button><hr></div>')
			.prependTo(Tagadapps.ChronoXT.inSearch.popup.htmlArea);
		
		Tagadapps.ChronoXT.inSearch.popup.inSearchTerm = jQuery('#insearch-term')
			.css({
				'background-color': 'transparent',
			    'border': '0 none',
			    'color': '#7a7975',
			    'display': 'inline',
			    'float': 'left',
			    'font': 'bold 12px/32px Arial',
			    'height': '32px',
			    'margin': '0 0 0 -10px',
			    'position': 'relative',
			    'height' : '38px',
			    'width' : '223px'
			});

		Tagadapps.ChronoXT.inSearch.popup.inSearchTermButton = jQuery('.insearch-term-send')
			.css({
				'background' :'url("http://www.chronodrive.com/emedias/web/merchandising/rentree/2014/images/bg_validSearch.jpg") no-repeat scroll 0 0 transparent',
				'display': 'inline',
	    		'float': 'right',
			    'height': '29px',
			    'margin': '4px 0 0 9px',
			    'position': 'relative',
			    'width': '29px'
			})
			.click( function(){ 
				Tagadapps.ChronoXT.inSearch.runSearch( Tagadapps.ChronoXT.inSearch.popup.inSearchTerm.val() ); 
			});

		jQuery('.insearch-results').remove();
		Tagadapps.ChronoXT.inSearch.popup.inSearchResults = jQuery('<div class="insearch-results"><p align="center"><i>Aucune recherche effectuée</i></p></div>')
			.css({ 
				'padding-left' : '20px', 
				'max-height' : '555px',
			})
			.appendTo(Tagadapps.ChronoXT.inSearch.popup.htmlArea);
	};

		/******************************************/

	Tagadapps.ChronoXT.inSearch.popup = {};
	Tagadapps.ChronoXT.inSearch.popup.popup = null;
	Tagadapps.ChronoXT.inSearch.popup.htmlArea = null;
	
	Tagadapps.ChronoXT.inSearch.popup.init = function()
	{
		Tagadapps.ChronoXT.inSearch.popup.popup = jQuery('#TB_overlay');
		Tagadapps.ChronoXT.inSearch.popup.htmlArea	= jQuery('#TB_innerHtml');
		
		Tagadapps.ChronoXT.inSearch.popup.closeButton = jQuery('#TB_closeWindowButton');
		Tagadapps.ChronoXT.inSearch.popup.closeButton.unbind('click').click( Tagadapps.ChronoXT.inSearch.popup.close );
	};

	Tagadapps.ChronoXT.inSearch.popup.setResults = function(content) {
		Tagadapps.ChronoXT.inSearch.popup.inSearchResults.html(content);
		jQuery('li a, li img', '.insearch-results ').unbind();
	};
	Tagadapps.ChronoXT.inSearch.popup.emptyResults = function()
	{
		Tagadapps.ChronoXT.inSearch.popup.inSearchResults.empty();
	};

	Tagadapps.ChronoXT.inSearch.popup.open = function()
	{
		jQuery('#TB_overlay, #TB_window, #TB_ajaxContent').addClass('db');
		jQuery('#TB_ajaxContent').addClass('layer01');
		jQuery('#TB_window').css({'left': '50%', 'margin-left': '-425px'});
		Tagadapps.ChronoXT.inSearch.popup.htmlArea.css({ 'max-height': '555px', width: '98%'});
		Tagadapps.ChronoXT.inSearch.popup.inSearchResults.css({ 'max-height': '508px', 'overflow':'scroll'});
		///, 'width': '850px', 'top' : '170px', 'background' : '#fff', 'height': '59%', 'overflow': 'auto' });
		//jQuery('.l_art .info_produit', Tagadapps.ChronoXT.inSearch.popup).css({ 'width' : '50%'});
	};

	Tagadapps.ChronoXT.inSearch.popup.close = function()
	{
		Tagadapps.ChronoXT.inSearch.popup.inSearchDock.remove();
		Tagadapps.ChronoXT.inSearch.popup.inSearchResults.remove();
		jQuery('#TB_overlay, #TB_window, #TB_ajaxContent').removeClass('db');
	};
	
	
	return Tagadapps.ChronoXT.inSearch.init();


});
