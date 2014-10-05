
jQuery(document).ready(function initChronoXT()
{
	ChronoXT = {};
	ChronoXT.inSearch = {};
	ChronoXT.inSearch.SEARCH_URL = '//www.chronodrive.com/refonte/store/search/product/';

	ChronoXT.inSearch.init = function()
	{
		ChronoXT.inSearch.popup.init();
		ChronoXT.inSearch.UI.init();

		return;
	};

	ChronoXT.inSearch.openBox = function(term)
	{
		ChronoXT.inSearch.init();
		ChronoXT.inSearch.popup.open();
	};

	ChronoXT.inSearch.runSearch = function(term)
	{
		if (term.length < 3)
			return false;
		ChronoXT.inSearch.popup.emptyResults();
		jQuery('#insearch-loader').fadeIn(500);
		jQuery.get(ChronoXT.inSearch.SEARCH_URL+term, {}, function(html)
		{
			jQuery('#insearch-loader').fadeOut(500);
			ChronoXT.inSearch.popup.setResults(jQuery(html).find('#liste_articles'));

		});
	}
	/******************************************/

	ChronoXT.inSearch.UI = {};
	ChronoXT.inSearch.UI.init = function()
	{
		ChronoXT.inSearch.UI.placeSearchBox();
		ChronoXT.inSearch.UI.placeOpenBoxButton();
		ChronoXT.inSearch.popup.inSearchTerm.get(0).focus();
	};
	ChronoXT.inSearch.UI.placeOpenBoxButton = function()
	{
		jQuery('#inSearchOpenBox').remove();
		jQuery('<div id="inSearchOpenBox" style="float: right; margin-top: 4px;"><button onclick="ChronoXT.inSearch.openBox()">inSearch</button></div>')
			.insertAfter('#super_top .search form');

	};
	ChronoXT.inSearch.UI.placeSearchBox = function()
	{
		jQuery('.insearch-dock').remove();
		ChronoXT.inSearch.popup.inSearchDock = jQuery('<div class="insearch-dock">')
			.css({
				'background' : 'url("http://www.chronodrive.com/emedias/web/merchandising/rentree/2014/images/bg_search.png") no-repeat scroll 0 0 transparent',
				'margin' : '0 0 20px 40px',
				'height' : '38px',
				'width' : '274px',
				'padding-left' : '45px'
			})
			.append('<input type="text" id="insearch-term" placeholder="Rechercher..."/>')
			.append('<button class="insearch-term-send"></button><hr></div>')
			.prependTo(ChronoXT.inSearch.popup.htmlArea);

		ChronoXT.inSearch.popup.inSearchTerm = jQuery('#insearch-term')
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

		ChronoXT.inSearch.popup.inSearchTermButton = jQuery('.insearch-term-send')
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
				ChronoXT.inSearch.runSearch( ChronoXT.inSearch.popup.inSearchTerm.val() );
			});

		jQuery('.insearch-results').remove();
		ChronoXT.inSearch.popup.inSearchResults = jQuery('<div class="insearch-results"><p align="center"><i>Aucune recherche effectuée</i></p></div>')
			.css({
				'padding-left' : '20px',
				'max-height' : '555px',
			})
			.appendTo(ChronoXT.inSearch.popup.htmlArea);



	};

	/******************************************/

	ChronoXT.inSearch.popup = {};
	ChronoXT.inSearch.popup.popup = null;
	ChronoXT.inSearch.popup.htmlArea = null;
	ChronoXT.inSearch.popup.ajaxLoader = null;

	ChronoXT.inSearch.popup.init = function()
	{
		ChronoXT.inSearch.popup.popup = jQuery('#TB_overlay');
		ChronoXT.inSearch.popup.htmlArea	= jQuery('#TB_innerHtml');

		ChronoXT.inSearch.popup.closeButton = jQuery('#TB_closeWindowButton');
		ChronoXT.inSearch.popup.closeButton.unbind('click').click( ChronoXT.inSearch.popup.close );

		ChronoXT.inSearch.popup.ajaxLoader = jQuery('<div id="insearch-loader" style="display:none;width:100%;text-align:center"><img src="http://www.namotuislandfiji.com/assets/ajax_loader-53e98b97000acd48fe2181527bd3c2a4.gif"/></div>').insertBefore('.insearch-results');


		var onAjaxFinally = function onAjaxFinally(){
			ChronoXT.inSearch.popup.ajaxLoader.fadeOut(500);
		};

		jQuery(document).ajaxStart(function(){ ChronoXT.inSearch.popup.ajaxLoader.fadeIn(500); });
		jQuery(document).ajaxComplete(onAjaxFinally);
		jQuery(document).ajaxError(onAjaxFinally);
		jQuery(document).ajaxStop(onAjaxFinally);
	};

	ChronoXT.inSearch.popup.setResults = function(content) {
		ChronoXT.inSearch.popup.inSearchResults.html(content);
		jQuery('li a, li img', '.insearch-results ').unbind();
	};
	ChronoXT.inSearch.popup.emptyResults = function()
	{
		ChronoXT.inSearch.popup.inSearchResults.empty();
	};

	ChronoXT.inSearch.popup.open = function()
	{
		jQuery('#TB_overlay, #TB_window, #TB_ajaxContent').addClass('db');
		jQuery('#TB_ajaxContent').addClass('layer01');
		jQuery('#TB_window').css({'left': '50%', 'margin-left': '-425px'});
		ChronoXT.inSearch.popup.htmlArea.css({ 'max-height': '555px', width: '98%'});
		ChronoXT.inSearch.popup.inSearchResults.css({ 'max-height': '508px', 'overflow':'auto'});
		///, 'width': '850px', 'top' : '170px', 'background' : '#fff', 'height': '59%', 'overflow': 'auto' });
		//jQuery('.l_art .info_produit', ChronoXT.inSearch.popup).css({ 'width' : '50%'});
	};

	ChronoXT.inSearch.popup.close = function()
	{
		ChronoXT.inSearch.popup.inSearchDock.remove();
		ChronoXT.inSearch.popup.inSearchResults.remove();
		jQuery('#TB_overlay, #TB_window, #TB_ajaxContent').removeClass('db');
	};


	return ChronoXT.inSearch.init();


});