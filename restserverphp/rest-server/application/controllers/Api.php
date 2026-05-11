<?php
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';
require APPPATH . 'libraries/Format.php';

use chriskacerguis\RestServer\RestController;

class Api extends RestController
{

    function __construct()
    {
        // Construct the parent class
        parent::__construct();
        $this->load->model("Mahasiswa_model", "mahasiswa");
        $this->methods['users_get']['limit'] = 100;
    }

    public function users_get()
    {
        // Users from a data store e.g. database
        // $users = [
        //     ['id' => 0, 'name' => 'John', 'email' => 'john@example.com'],
        //     ['id' => 1, 'name' => 'Jim', 'email' => 'jim@example.com'],
        // ];
        $id = $this->get('id');
        if ($id === null) {
            $mahasiswa = $this->mahasiswa->getMahasiswa();
        } else {
            $mahasiswa = $this->mahasiswa->getMahasiswa($id);
        }

        if ($id === null) {
            // Check if the users data store contains users
            if ($mahasiswa) {
                // Set the response and exit
                $this->response($mahasiswa, 200);
            } else {
                // Set the response and exit
                $this->response([
                    'status' => false,
                    'message' => 'No users were found'
                ], 404);
            }
        } else {
            if (array_key_exists("id", $mahasiswa[0])) {
                $this->response($mahasiswa[0], 200);
            } else {
                $this->response([
                    'status' => false,
                    'message' => 'No such user found'
                ], 404);
            }
        }
    }

    public function index_delete()
    {
        $id = $this->delete("id");
        if ($id === null) {
            $this->response([
                "status" => false,
                "message" => "provide an id!"
            ], RestController::HTTP_BAD_REQUEST);
        } else {
            if ($this->mahasiswa->deleteMahasiswa($id) > 0) {
                $this->response([
                    "status" => true,
                    "id" => $id,
                    "message" => "deleted."
                ], 404);
            } else {
                $this->response([
                    "status" => false,
                    "message" => "id not found!"
                ], RestController::HTTP_BAD_REQUEST);
            }
        }
    }

    public function index_post()
    {
        $data = [
            "nama" => $this->post("nama"),
            "nrp" => $this->post("nrp"),
            "email" => $this->post("email"),
            "jurusan" => $this->post("jurusan"),
        ];
        if ($this->mahasiswa->createMahasiswa($data) > 0) {
            $this->response([
                "status" => true,
                "message" => "new mahasiswa has been created."
            ], RestController::HTTP_CREATED);
        } else {
            $this->response([
                "status" => false,
                "message" => "failed to create new data!"
            ], RestController::HTTP_BAD_REQUEST);
        }
    }

    public function index_put()
    {
        $id = $this->put("id");
        $data = [
            "nrp" => $this->put("nrp"),
            "nama" => $this->put("nama"),
            "email" => $this->put("email"),
            "jurusan" => $this->put("jurusan")
        ];
        if ($this->mahasiswa->updateMahasiswa($data, $id) > 0) {
            $this->response([
                "status" => true,
                "message" => "data mahasiswa has been updated."
            ], 404);
        } else {
            $this->response([
                "status" => false,
                "message" => "failed to update data!"
            ], RestController::HTTP_BAD_REQUEST);
        }
    }
}
