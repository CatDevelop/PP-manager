<?php

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

$returnResult = [];
$authorizationHeader = "Authorization: Bearer " . $data['token'];

$year = $data['year'];
$term = $data['term'];

$headers = array(
    "Authorization: Bearer " . $data['token'],
);

$requestOptions = [
    'http' => [
        'header' => $headers,
        'method' => 'GET',
    ],
];

$context = stream_context_create($requestOptions);
$projects = [];

// foreach ($periods['periods'] as $period) {
$workspaceResponse = file_get_contents(
    "https://teamproject.urfu.ru/api/v2/workspaces?status=any&year={$year}&semester={$term}&size=10000&page=1",
    false,
    $context
);

$workspace = json_decode($workspaceResponse, true);
$projects = array_merge($projects, $workspace['items']);
// }

$i = 0;

foreach ($projects as $project) {
    $details = [];
    $results = [];
    $documents = [];
    $team = [];

    $documentsResponse = file_get_contents("https://teamproject.urfu.ru/api/v2/workspaces/{$project['id']}/documents/results", false, $context);
    $detailsResponse = file_get_contents("https://teamproject.urfu.ru/api/v2/workspaces/{$project['id']}/details", false, $context);
    $resultsResponse = file_get_contents("https://teamproject.urfu.ru/api/v2/workspaces/{$project['id']}/result", false, $context);
    $teamResponse = file_get_contents("https://teamproject.urfu.ru/api/v2/workspaces/{$project['id']}/team", false, $context);

    $documents = json_decode($documentsResponse, true);
    $details = json_decode($detailsResponse, true);
    $results = json_decode($resultsResponse, true);
    $team = json_decode($teamResponse, true);

    $returnResult[] = ['project' => $project, 'details' => $details, 'results' => $results, 'documents' => $documents, 'team' => $team];

    $i += 1;
}

echo json_encode($returnResult);

?>
