
singledefined=0;
overviewdefined=0;
packagedefined=0;
course_div="";
$('.packageoverview').live('click', function (e) {
	return load_single_package_category(base_url+"api/pageapi/packageoverview",0,0);
});

$('.categoryoverview').live('click', function (e) {
	return load_single_package_category(base_url+"api/pageapi/categorypackage/"+$(this).attr('category_id'),1,$(this).attr('category_id'),0);
});

//window.history.replaceState({ type: 1, course_id: 0, single:0, url_toload: "AAA" }, document.title, document.location.href);

window.addEventListener('popstate', function(event) {
  console.log('popstate fired!');
  if(event.state)
	{
	  $('.main_content').html(event.state.content);
		if(event.state.type==1)
			 TableEditable_Package.init();
	}
});

    // Store the initial content so we can revisit it later
function load_single_package_category(url_toload,single,category_id,course_id,notsetstate)
{
//	stateObj = { type: 1, course_id: course_id, single:single, url_toload: url_toload };
/*	if(single==1)
	{
		$('#side_accordion .active').removeClass("active");
		$($('.accordion-group[course_id='+course_id+'] .accordion-body li')[0]).addClass('active');
		if($('#side_accordion .accordion-group[course_id='+course_id+']').find('.collapse.in').length==0)
		{
		$('#side_accordion .collapse.in').collapse('hide');
		$('#side_accordion .accordion-group[course_id='+course_id+']').find('.collapse').not('.in').collapse('show');//{parent:true});
		}
	}
	else
	{
		$('#side_accordion .active').removeClass("active");
		$('#side_accordion .collapse.in').collapse('hide');
	}*/
	$.ajax({
		url: url_toload,
		type: 'POST',
		success: function(msg)
		{
			$('.main_content').html(msg);
			if(single==1)
			{
//				if(singledefined==0)
				stateObj = { type: 1, content: $('.main_content').html()};
				course_div=$('#course_div').html();

				TableEditable_Package.init();
				if(notsetstate!=1)
					window.history.pushState(stateObj, null, base_url+'admin/managepackages/'+category_id);
//				else
//					TableEditable_SingleCourse.init_table();
			}
			else
			{
				stateObj = { type: 0, content: $('.main_content').html()};
//				TableEditable_CourseOverview.init();
				window.location.hash='';
				if(notsetstate!=1)
					window.history.pushState(stateObj, null, base_url+'admin/managepackages');
			}
		}
		}).fail( function(msg)
		{
			alert('Failed Operation:'+JSON.stringify(msg));
		});
	return false;
}


var TableEditable_Package = function () {
	return {

		//main function to initiate the module
		init: function () {
			function ajax_helper(form_data,nRow)
			{
				$.ajax({
					url: base_url+"api/service/package",
					type: 'POST',
					data: form_data,
					success: function(msg)
					{
						if(msg.success==1)
						{
							if(msg.from=='add')
							{
								$(nEditing).attr('package_id',msg.m_package.package_id);
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
				jqTds[0].innerHTML = '<input type="text" class="span12" value="' + aData[0] + '" id="package_name">';
				jqTds[1].innerHTML = course_div;
				course_list=$(aData[1]).find('li');
				for(i=0;i<course_list.length;i++)
				{
					$(jqTds[1]).find('option[value='+$(course_list[i]).attr('course_id')+']').prop('selected',true);
				}
				$('.courseselector').chosen();
				jqTds[2].innerHTML = '<input type="text" class="span12" value="' + aData[2] + '" id="price">';
				jqTds[3].innerHTML = '<a class="edit" href="" stats="Save">Save</a>';;
				jqTds[4].innerHTML = '<a class="cancel" href="">Cancel</a>';
			}

			//		Save Row

			function saveRow(oTable, nRow) {
//							var jqInputs = $('input', nRow);
				var aData = oTable.fnGetData(nRow);

				oTable.fnUpdate($('#package_name').val(), nRow, 0, false);
				courses=$('.courseselector').val();
				course_list="<ul>";
				for(i=0;i<courses.length;i++)
				{
					course_list+='<li course_id="'+courses[i]+'">'+$('.courseselector option[value='+courses[i]+']').html()+'</li>';
				}
				course_list+="</ul>";
				oTable.fnUpdate(course_list, nRow, 1, false);
				oTable.fnUpdate($('#price').val(), nRow, 2, false);
				oTable.fnUpdate('<a href="#" class="edit" title="Edit">Edit</a>', nRow, 3, false);
				oTable.fnUpdate('<a href="#" class="delete" title="Delete">Delete</a>', nRow, 4, false);
//							oTable.fnDraw();
			}

//******************unit Overview Form*****************************
			var oTable;

			oTable = $('.dt_packageoverview').dataTable({
				"sDom": "<'row'<'span6'<'dt_actions'>l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
				"aLengthMenu": [
					[5, 10, 20, -1],
					[5, 10, 20, "All"] // change per page values here
				],
//				"sPaginationType": "bootstrap_alt",
				"oLanguage": {
					"sLengthMenu": "_MENU_ records per page"
					},"iDisplayLength":"-1",//"bPaginate": false,
						"bDestroy": true, "bRetrieve":true

			});


			if(packagedefined)
			{
				$('.dt_packageoverview a.delete').die();
				$('.dt_packageoverview a.edit').die();
				$('.dt_packageoverview a.cancel').die();
//				oTable = $('#dt_singleunit').dataTable();
			}

			var nEditing = null;
			packagedefined=1;


			//			Adding a New unit  !!!
			$('#btn_new_package').click(function (e) {
				e.preventDefault();
				if (nEditing !== null)
				{
					if ($(nEditing).find('.cancel').attr("data-mode") == "new") {
						return false;
					} else {
						restoreRow(oTable, nEditing);
					}
				}
				var aiNew = oTable.fnAddData(['<input type="text" class="span12" value="" id="package_name">',course_div,'<input type="text" class="span12" value="" id="price">',
					'<a class="edit" href="" stats="Save">Save</a>','<a class="cancel" data-mode="new" href="">Cancel</a>']);
				$('.courseselector').chosen();
				var nRow = oTable.fnGetNodes(aiNew[0]);
				nEditing = nRow;
			});

			//			Deleteing unit

			$('.dt_packageoverview a.delete').live('click', function (e) {
				e.preventDefault();
				if (confirm("Are you sure to delete this package?") == false) {
					return;
				}
				var nRow = $(this).parents('tr')[0];

				ajax_helper({'operation':'delete_package','package_id':$(nRow).attr('package_id')},nRow);
//							oTable.fnDeleteRow(nRow);
//							alert("Deleted! Do not forget to do some ajax to sync with backend :)");
			});

			$('.dt_packageoverview a.cancel').live('click', function (e) {
				e.preventDefault();
				if ($(this).attr("data-mode") == "new") {
					var nRow = $(this).parents('tr')[0];
					oTable.fnDeleteRow(nRow);
				} else {
					restoreRow(oTable, nEditing);
				}
				nEditing=null;
			});

			$('.dt_packageoverview a.edit').live('click', function (e) {
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

					if(($("#package_name").val()=="")&&($("#price").val()=="")&&(!isNumber($("#price").val())))
					{
						alert('Input Valid Value');
						return;
					}
//				Editing this row and want to save it
					courses=$('.courseselector').val();

					if($(nRow).attr('package_id'))
						ajax_helper({'operation':'update_package','package_id':$(nEditing).attr('package_id'),'package_name':$("#package_name").val(),'price':$("#price").val(),'courses':courses},nEditing);
					else
						ajax_helper({'operation':'add_package','package_name':$("#package_name").val(),'price':$("#price").val(),'courses':courses,'category_id':$(this).closest('table').attr('category_id')},nEditing);
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

