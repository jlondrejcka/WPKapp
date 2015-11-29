/*function openKCFinder() {
//	alert("Field_Name: " + field_name + "nURL: " + url + "nType: " + type + "nWin: " + win); // debug/testing
	alert('KKKKKKKKKKKK');
	window.KCFinder = {};
	window.KCFinder.callBack = function(url) {
		window.KCFinder = null;
		console.log(url) // URL is the call back result from KCfinder, example: /image/a.jpg
	};
	window.open('../static/admin/file-manager/browse.php?type=files&amp;dir=files', 'kcfinder_single');

//$('#basic-modal-content').html('<iframe name="kcfinder_iframe" id="kcfinder_iframe" src="../static/admin/file-manager/browse.php?type=files&amp;dir=files" frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" scrolling="no"></iframe>');
//	$('#basic-modal-content').modal();
	return false;
};*/


function openKCFinder(assignment_id) {
//    var div = document.getElementById('basic-modal-content');#kcfinder_div
    var div = document.getElementById('unclickableDiv');
/*    if (div.style.display == "block") {
        div.style.display = 'none';
        div.innerHTML = '';
        return;
    }*/
   window.KCFinder = {
        callBack: function(url) {
            window.KCFinder = null;
//            field.value = url;
            div.style.display = 'none';
            div.innerHTML = '';
			ajax_file_helper({'operation':'add_file','assignment_id':assignment_id,'file_url':url});
        }
    };
//    div.innerHTML = '<iframe name="kcfinder_iframe" src="/demo/kcfinder/browse.php?type=files&dir=files/public" ' +
//        'frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" scrolling="no" />';
	div.innerHTML='<div id="kcfinder_div"><a class="modalCloseImg" href="#"></a><iframe name="kcfinder_iframe" id="kcfinder_iframe" src="'+base_url+'static/admin/file-manager/browse.php?type=files&amp;dir=files" '+
//		'frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" scrolling="no" />';
		'frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" scrolling="no"></iframe></div>';
    div.style.display = 'block';
//	$(div).modal();
}

function openKCFinder_ppt(assignment_id) {
    var div = document.getElementById('unclickableDiv');
   window.KCFinder = {
        callBack: function(url) {
            window.KCFinder = null;
            div.style.display = 'none';
            div.innerHTML = '';
			ajax_ppt_helper({'operation':'update_ppt_file','assignment_id':assignment_id,'file_url':url});
        }
    };
	div.innerHTML='<div id="kcfinder_div"><a class="modalCloseImg" href="#"></a><iframe name="kcfinder_iframe" id="kcfinder_iframe" src="'+base_url+'static/admin/file-manager/browse.php?type=powerpoint&amp;dir=powerpoint" '+
		'frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" scrolling="no"></iframe></div>';
    div.style.display = 'block';
}



$('#unclickableDiv .modalCloseImg').live('click', function (e) {
	e.preventDefault();
    window.KCFinder = null;
    var div = document.getElementById('unclickableDiv');
	div.style.display = 'none';
	div.innerHTML = '';
});

$('#unclickableDiv1 .modalCloseImg').live('click', function (e) {
	e.preventDefault();
    var div = document.getElementById('unclickableDiv1');
	div.style.display = 'none';
	div.innerHTML = '';
});

$('.addfile').live('click', function (e) {
	e.preventDefault();
	openKCFinder($(this).closest('tr').attr('assignment_id'));
});

$('.addppt').live('click', function (e) {
	e.preventDefault();
	openKCFinder_ppt($(this).closest('tr').attr('assignment_id'));
});

$('.editquiz').live('click', function (e) {
	e.preventDefault();
    var div1 = document.getElementById('unclickableDiv1');

	if($('.breadCrumb').find('li').length==5)
		attach=$(this).closest('tr').attr('assignment_id');//+$(this).closest('table').attr('unit_id');//+"/"+
	else
		attach="-"+$(this).closest('tr').attr('unit_id');
/*	div.innerHTML='<div id="quiz_div"><a class="modalCloseImg" href="#"></a><iframe name="quiz_frame" id="quiz_frame" class="quiz_frame" src="'+base_url+'api/pageapi/quizbox/'+attach+'" '+
		'frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" scrolling="no"></iframe></div>';*/

/*	$('.quiz_frame').load(function(e)
	{

	});*/
	div1.innerHTML='<div id="quiz_div"><a class="modalCloseImg" href="#"></a><div id="quiz_frame" class="quiz_frame"></div></div>';
	div1.style.display = 'block';
	$.ajax({
	url: base_url+'api/pageapi/quizbox/'+attach,
	type: 'POST',
	success: function(msg)
	{
		$('.quiz_frame').html(msg);
		TableEditable_Quiz.init();
		$('.with_answer input[type=radio]').attr('disabled', 'true');
	}
	}).fail( function(msg)
	{
		alert('Failed Operation:'+JSON.stringify(msg));
	});

});
/*$('.quiz_frame').load(function()
{
	alert('great circle of life');
});*/


$('.file_delete').live('click', function (e) {
	e.preventDefault();
	ajax_file_helper({'operation':'delete_file','file_id':$(this).closest('li').attr('file_id')});
});

$('.ppt_delete').live('click', function (e) {
	e.preventDefault();
	ajax_ppt_helper({'operation':'update_ppt_file','assignment_id':$(this).closest('tr').attr('assignment_id'),'file_url':''});
});

function openTextDlg(assignment_id) {
/*    var div = document.getElementById('unclickableDiv');
   window.KCFinder = {
        callBack: function(url) {
            window.KCFinder = null;
            div.style.display = 'none';
            div.innerHTML = '';
			ajax_ppt_helper({'operation':'update_ppt_file','assignment_id':assignment_id,'file_url':url});
        }
    };
	div.innerHTML='<div id="kcfinder_div"><a class="modalCloseImg" href="#"></a><iframe name="kcfinder_iframe" id="kcfinder_iframe" src="'+base_url+'static/admin/file-manager/browse.php?type=powerpoint&amp;dir=powerpoint" '+
		'frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" scrolling="no"></iframe></div>';
    div.style.display = 'block';*/

//	e.preventDefault();
    var div1 = document.getElementById('unclickableDiv1');

	tds=$('.dt_singleunit tr[assignment_id='+assignment_id+']').find('td');

	divtext='<div id="text_div" assignment_id="'+assignment_id+'"><a class="modalCloseImg" href="#"></a><div id="text_frame" class="text_frame"><h3 class="text_header center">'+$(tds[0]).html()+'</h3><div class="text_container">';
	divtext+='<textarea id="assignment_text">'+$(tds[6]).html()+'</textarea></div><div class="submit_container"><a id="btn_text_submit" href="#" class="btn btn-info btn-small span2">Submit</a></div></div></div>';
	div1.innerHTML=divtext;
	div1.style.display = 'block';
}

$('#btn_text_submit').live('click', function (e) {
	e.preventDefault();
	ajax_ppt_helper({'operation':'update_assignment_text','assignment_id':$('#text_div').attr('assignment_id'),'assignment_text':$('#assignment_text').val()});
});


$('.edittext').live('click', function (e) {
	e.preventDefault();
	openTextDlg($(this).closest('tr').attr('assignment_id'));
//	ajax_ppt_helper({'operation':'update_text','assignment_id':$(this).closest('tr').attr('assignment_id'),'assignment_text':''});
});
function ajax_ppt_helper(form_data)
{
	$.ajax({
		url: base_url+"api/service/assignment",
		type: 'POST',
		data: form_data,
		success: function(msg)
		{
			if(msg.success==1)
			{
				if(msg.from=='update_ppt_file')
				{
					if(msg.file_url=="")
					{
						divinner='<a class="addppt" href="javascript:;">Add Slideshow</a>';
					}else
					{
						divinner='<div><a href="#" class="ppt_delete"><i class="splashy-document_a4_remove"></i></a> '+msg.file_url+'<a class="addppt changeppt" href="javascript:;"><i class="icon-retweet"></i></a></div>';
					}
					tds=$('.dt_singleunit tr[assignment_id='+msg.assignment_id+']').find('td');
					$(tds[2]).html(divinner);
//					filediv=$(tds[1]).find('ul');
//					filediv.html(filediv.html()+"<li file_id='"+msg.file.file_id+"'><a href='#' class='file_delete'><i class='splashy-document_a4_remove'></i></a>"+msg.file.file_name+"</li>");
				}
				else if(msg.from=='update_assignment_text')
				{
					tds=$('.dt_singleunit tr[assignment_id='+msg.assignment_id+']').find('td');
					$(tds[6]).html(msg.assignment_text);
//					tds=$('.dt_singleunit li[file_id='+msg.file_id+']').remove();
					var div = document.getElementById('unclickableDiv1');
					div.style.display = 'none';
					div.innerHTML = '';
				}
			}
			else
			{
				if(msg.from=='update_ppt_file')
				{
				}
				else if(msg.from=='update_assignment_text')
				{
					var div = document.getElementById('unclickableDiv1');
					div.style.display = 'none';
					div.innerHTML = '';
				}
				else
				{
					alert("Error:"+JSON.stringify(msg));
				}
			}
		}
	}).fail( function(msg)
	{
			alert('Failed Operation:'+JSON.stringify(msg));
	});
	return false;
}

function ajax_file_helper(form_data)
{
	$.ajax({
		url: base_url+"api/service/file",
		type: 'POST',
		data: form_data,
		success: function(msg)
		{
			if(msg.success==1)
			{
				if(msg.from=='add')
				{
					tds=$('.dt_singleunit tr[assignment_id='+msg.file.assignment_id+']').find('td');
					filediv=$(tds[3]).find('ul');
					filediv.html(filediv.html()+"<li file_id='"+msg.file.file_id+"'><a href='#' class='file_delete'><i class='splashy-document_a4_remove'></i></a>"+msg.file.file_name+"</li>");
//					$(nEditing).attr('assignment_id',msg.assignment.assignment_id);
//					saveRow(oTable,nEditing);
//					tds=$(nEditing).find('td');
//					$(tds[1]).addClass('center');
//					$(tds[2]).addClass('center');
//					nEditing = null;
				}
				else if(msg.from=='delete')
				{
					tds=$('.dt_singleunit li[file_id='+msg.file_id+']').remove();
				}
			}
			else
			{
				alert("Error:"+JSON.stringify(msg));
			}
		}
	}).fail( function(msg)
	{
			alert('Failed Operation:'+JSON.stringify(msg));
	});
	return false;
}

var TableEditable_SingleUnit = function () {
	return {

		//main function to initiate the module
		init: function () {
			function ajax_helper(form_data,nRow)
			{
				$.ajax({
					url: base_url+"api/service/assignment",
					type: 'POST',
					data: form_data,
					success: function(msg)
					{
						if(msg.success==1)
						{
							if(msg.from=='add')
							{
								$(nEditing).attr('assignment_id',msg.assignment.assignment_id);
								saveRow(oTable,nEditing);
//								tds=$(nEditing).find('td');
//								$(tds[1]).addClass('center');
//								$(tds[2]).addClass('center');
								nEditing = null;
							}
							else if(msg.from=='update')
							{
								saveRow(oTable,nEditing);
								nEditing = null;
							}
							else if(msg.from=='delete')
							{
								oTable.fnDeleteRow(nRow);
							}
						}
						else
						{
							if(msg.from=='update')
							{
								saveRow(oTable,nEditing);
								nEditing = null;
							}
							else
								alert("Error:"+JSON.stringify(msg));
						}
					}
				}).fail( function(msg)
				{
						alert('Failed Operation:'+JSON.stringify(msg));
				});
				return false;
			}


			//		Restore Row
			function restoreRow(oTable, nRow) {
				var aData = oTable.fnGetData(nRow);
				var jqTds = $('>td', nRow);

				for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
					oTable.fnUpdate(aData[i], nRow, i, false);
				}
			}

			//		Edit Row

			function editRow(oTable, nRow) {
				var aData = oTable.fnGetData(nRow);
				var jqTds = $('>td', nRow);
				jqTds[0].innerHTML = '<input type="text" class="span12" value="' + aData[0] + '" id="assignment_name">';
				jqTds[5].innerHTML = '<a class="edit" href="" stats="Save">Save</a> | <a class="cancel" href="">Cancel</a>';
			}

			//		Save Row

			function saveRow(oTable, nRow) {
//							var jqInputs = $('input', nRow);
				var aData = oTable.fnGetData(nRow);

				oTable.fnUpdate($('#assignment_name').val(), nRow, 0, false);
				oTable.fnUpdate('<a class="edittext" href="javascript:;">Edit Text</a>', nRow, 1, false);
				if(aData[2]=="")
				{
					oTable.fnUpdate('<a class="addppt" href="javascript:;">Add Slideshow</a>', nRow, 2, false);
				}
				if(aData[3]=="")
				{
					oTable.fnUpdate('<ul></ul><a href="#" class="addfile" title="Add File">Add File</a>', nRow, 3, false);
				}
				oTable.fnUpdate('<a href="#" class="editquiz" title="Edit Quiz">Edit Quiz</a>', nRow, 4, false);
				oTable.fnUpdate('<a href="#" class="edit" title="Edit">Edit</a> | <a href="#" class="delete" title="Delete">Delete</a>', nRow, 5, false);
//							oTable.fnDraw();
			}

//******************unit Overview Form*****************************
			var oTable;
			if(singledefined)
			{
				$('.dt_singleunit a.delete').die();
				$('.dt_singleunit a.edit').die();
				$('.dt_singleunit a.cancel').die();
//				oTable = $('#dt_singleunit').dataTable();
			}
//			else
			oTable = $('.dt_singleunit').dataTable({
				"sDom": "<'row'<'span6'<'dt_actions'>l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"aLengthMenu": [
					[5, 10, 20, -1],
					[5, 10, 20, "All"] // change per page values here
				],"aaSorting": [],
//				"sPaginationType": "bootstrap_alt",
				"oLanguage": {
					"sLengthMenu": "_MENU_ records per page"
					},
						"bDestroy": true, "bRetrieve":true
				}).rowReordering();
			var nEditing = null;
			unitdefined=1;

			//			Adding a New unit  !!!
			$('#btn_new_assignment').click(function (e) {
				e.preventDefault();
				if (nEditing !== null)
				{
					if ($(nEditing).find('.cancel').attr("data-mode") == "new") {
						return false;
					} else {
						restoreRow(oTable, nEditing);
					}
				}
				var aiNew = oTable.fnAddData(['<input type="text" class="span12" value="" id="assignment_name">','','','','',
					'<a class="edit" href="" stats="Save">Save</a> | <a class="cancel" data-mode="new" href="">Cancel</a>','']);
				var nRow = oTable.fnGetNodes(aiNew[0]);
				tds=$(nRow).find('td');
				$(tds[6]).addClass('hidden');
				nEditing = nRow;
			});

			//			Deleteing unit

			$('.dt_singleunit a.delete').live('click', function (e) {
				e.preventDefault();
				if (confirm("Are you sure to delete this row ?") == false) {
					return;
				}
				var nRow = $(this).parents('tr')[0];

				ajax_helper({'operation':'delete_assignment','assignment_id':$(nRow).attr('assignment_id')},nRow);
//							oTable.fnDeleteRow(nRow);
//							alert("Deleted! Do not forget to do some ajax to sync with backend :)");
			});

			$('.dt_singleunit a.cancel').live('click', function (e) {
				e.preventDefault();
				if ($(this).attr("data-mode") == "new") {
					var nRow = $(this).parents('tr')[0];
					oTable.fnDeleteRow(nRow);
				} else {
					restoreRow(oTable, nEditing);
				}
				nEditing=null;
			});

			$('.dt_singleunit a.edit').live('click', function (e) {
				e.preventDefault();

				// Get the row as a parent of the link that was clicked on 
				var nRow = $(this).parents('tr')[0];

				if (nEditing !== null && nEditing != nRow) {
					// Currently editing - but not this row - restore the old before continuing to edit mode 
					if ($(nEditing).find('.cancel').attr("data-mode") == "new") {
						oTable.fnDeleteRow(nEditing);
					} else {
						restoreRow(oTable, nEditing);
					}
					editRow(oTable, nRow);
					nEditing = nRow;
				} else if (nEditing == nRow && $(this).attr("stats") == "Save") {

					if($("#assignment_name").val()=="")
					{
						alert('Input assignment Name');
						return;
					}
//				Editing this row and want to save it 
					if($(nRow).attr('assignment_id'))
						ajax_helper({'operation':'update_assignment','assignment_id':$(nEditing).attr('assignment_id'),'assignment_name':$("#assignment_name").val()},nEditing);
					else
						ajax_helper({'operation':'add_assignment','assignment_name':$("#assignment_name").val(),'unit_id':$(this).closest('table').attr('unit_id')},nEditing);
//						ajax_helper({'operation':'add_car_model','car_model_name':$("#car_model_name").val(),'car_manufacturer_id':$("#manufacturer").val()},nEditing);
				} else {
//								 No edit in progress - let's start one 
					editRow(oTable, nRow);
					nEditing = nRow;
				}
			});
		}
	};

}();

